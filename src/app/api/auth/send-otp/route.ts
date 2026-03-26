import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST /api/auth/send-otp - إرسال رمز التحقق
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json(
        { error: 'رقم الهاتف مطلوب' },
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

    // التحقق من عدم وجود طلبات كثيرة
    const recentOtps = await db.oTPCode.findMany({
      where: {
        userId: user.id,
        type: 'PHONE_VERIFICATION',
        createdAt: {
          gt: new Date(Date.now() - 60 * 1000), // آخر دقيقة
        },
      },
    });

    if (recentOtps.length >= 3) {
      return NextResponse.json(
        { error: 'طلبات كثيرة، حاول بعد دقيقة' },
        { status: 429 }
      );
    }

    // إنشاء رمز OTP جديد
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    await db.oTPCode.create({
      data: {
        userId: user.id,
        code: otpCode,
        type: 'PHONE_VERIFICATION',
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 دقائق
      },
    });

    // TODO: إرسال OTP عبر الواتساب باستخدام Twilio أو 360dialog
    // للتجربة، نطبع الرمز في السجل
    console.log(`[DEV] OTP for ${phone}: ${otpCode}`);

    // في بيئة التطوير، نعيد الرمز في الاستجابة
    const isDevelopment = process.env.NODE_ENV !== 'production';

    return NextResponse.json({
      message: 'تم إرسال رمز التحقق',
      ...(isDevelopment && { devCode: otpCode }),
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إرسال الرمز' },
      { status: 500 }
    );
  }
}
