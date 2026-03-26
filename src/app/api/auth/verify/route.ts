import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

// POST /api/auth/verify - التحقق من OTP
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, code } = body;

    if (!phone || !code) {
      return NextResponse.json(
        { error: 'رقم الهاتف والرمز مطلوبان' },
        { status: 400 }
      );
    }

    // البحث عن المستخدم
    const user = await db.user.findUnique({
      where: { phone },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'المستخدم غير موجود' },
        { status: 404 }
      );
    }

    // البحث عن رمز OTP
    const otpRecord = await db.oTPCode.findFirst({
      where: {
        userId: user.id,
        code,
        type: 'PHONE_VERIFICATION',
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'الرمز غير صحيح أو منتهي الصلاحية' },
        { status: 400 }
      );
    }

    // تحديث رمز OTP كمستخدم
    await db.oTPCode.update({
      where: { id: otpRecord.id },
      data: { used: true },
    });

    // تحديث المستخدم كموثق
    await db.user.update({
      where: { id: user.id },
      data: {
        phoneVerified: new Date(),
        status: 'ACTIVE',
      },
    });

    // إنشاء جلسة
    const token = uuidv4();
    const refreshToken = uuidv4();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.session.create({
      data: {
        userId: user.id,
        token,
        refreshToken,
        expiresAt,
      },
    });

    // جلب بيانات المستخدم الكاملة
    const fullUser = await db.user.findUnique({
      where: { id: user.id },
      include: {
        role: true,
        seller: true,
        store: true,
        buyer: true,
      },
    });

    // إعداد الاستجابة
    const response = NextResponse.json({
      message: 'تم التحقق بنجاح',
      user: {
        id: fullUser?.id,
        email: fullUser?.email,
        phone: fullUser?.phone,
        name: fullUser?.name,
        nameAr: fullUser?.nameAr,
        avatar: fullUser?.avatar,
        userType: fullUser?.userType,
        role: fullUser?.role,
        seller: fullUser?.seller,
        store: fullUser?.store,
        buyer: fullUser?.buyer,
      },
    });

    // تعيين الكوكيز
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    });

    response.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء التحقق' },
      { status: 500 }
    );
  }
}
