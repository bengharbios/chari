import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// POST /api/auth/login - تسجيل الدخول
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // التحقق من البيانات
    if (!email || !password) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }

    // البحث عن المستخدم
    const user = await db.user.findUnique({
      where: { email },
      include: {
        role: true,
        seller: true,
        store: true,
        buyer: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    // التحقق من كلمة المرور
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    // التحقق من حالة المستخدم
    if (user.status === 'SUSPENDED') {
      return NextResponse.json(
        { error: 'تم تعليق حسابك. تواصل مع خدمة العملاء' },
        { status: 403 }
      );
    }

    if (user.status === 'BANNED') {
      return NextResponse.json(
        { error: 'تم حظر حسابك' },
        { status: 403 }
      );
    }

    // إنشاء جلسة
    const token = uuidv4();
    const refreshToken = uuidv4();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 أيام

    await db.session.create({
      data: {
        userId: user.id,
        token,
        refreshToken,
        expiresAt,
      },
    });

    // تحديث آخر تسجيل دخول
    await db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // إعداد الاستجابة
    const response = NextResponse.json({
      message: 'تم تسجيل الدخول بنجاح',
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        nameAr: user.nameAr,
        avatar: user.avatar,
        userType: user.userType,
        role: user.role,
        seller: user.seller,
        store: user.store,
        buyer: user.buyer,
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
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 يوم
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تسجيل الدخول' },
      { status: 500 }
    );
  }
}
