import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

// POST /api/auth/register - تسجيل مستخدم جديد
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, password, name, nameAr, userType } = body;

    // التحقق من البيانات
    if (!phone || !password || !name) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    // التحقق من عدم وجود المستخدم
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { phone },
          ...(email ? [{ email }] : []),
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'المستخدم موجود بالفعل' },
        { status: 400 }
      );
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // البحث عن الدور المناسب
    let roleName = 'BUYER';
    if (userType === 'SELLER') roleName = 'SELLER';
    if (userType === 'STORE') roleName = 'STORE';

    const role = await db.role.findFirst({
      where: { name: roleName },
    });

    if (!role) {
      // إنشاء الدور إذا لم يكن موجوداً
      const createdRole = await db.role.create({
        data: {
          name: roleName,
          nameAr: roleName === 'BUYER' ? 'مشتري' : roleName === 'SELLER' ? 'تاجر مستقل' : 'متجر',
          permissions: '[]',
        },
      });
    }

    const userRole = await db.role.findFirst({
      where: { name: roleName },
    });

    if (!userRole) {
      return NextResponse.json(
        { error: 'خطأ في النظام' },
        { status: 500 }
      );
    }

    // إنشاء المستخدم
    const user = await db.user.create({
      data: {
        email: email || `${phone}@chariday.dz`,
        phone,
        password: hashedPassword,
        name,
        nameAr: nameAr || name,
        roleId: userRole.id,
        userType,
        status: 'PENDING',
      },
    });

    // إنشاء سجل المشتري أو التاجر حسب النوع
    if (userType === 'BUYER') {
      await db.buyer.create({
        data: {
          userId: user.id,
        },
      });
    } else if (userType === 'SELLER') {
      await db.seller.create({
        data: {
          userId: user.id,
        },
      });
    } else if (userType === 'STORE') {
      const crypto = await import('crypto');
      const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') + '-' + crypto.randomUUID().slice(0, 8);
      await db.store.create({
        data: {
          userId: user.id,
          storeName: name,
          storeNameAr: nameAr || name,
          slug,
        },
      });
    }

    // إنشاء رمز OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await db.oTPCode.create({
      data: {
        userId: user.id,
        code: otpCode,
        type: 'PHONE_VERIFICATION',
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 دقائق
      },
    });

    // TODO: إرسال OTP عبر الواتساب
    console.log(`OTP for ${phone}: ${otpCode}`);

    return NextResponse.json({
      message: 'تم إنشاء الحساب بنجاح',
      userId: user.id,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء الحساب' },
      { status: 500 }
    );
  }
}
