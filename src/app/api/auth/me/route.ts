import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/auth/me - Get current user
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json({ user: null });
    }

    const session = await db.session.findFirst({
      where: { token },
      include: {
        user: {
          include: {
            role: true,
            seller: true,
            store: true,
            buyer: true,
          },
        },
      },
    });

    if (!session) {
      return NextResponse.json({ user: null });
    }

    if (session.expiresAt < new Date()) {
      await db.session.delete({ where: { id: session.id } });
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: session.user.id,
        email: session.user.email,
        phone: session.user.phone,
        name: session.user.name,
        nameAr: session.user.nameAr,
        avatar: session.user.avatar,
        userType: session.user.userType,
        role: session.user.role,
        seller: session.user.seller,
        store: session.user.store,
        buyer: session.user.buyer,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ user: null });
  }
}

// POST /api/auth/logout - Logout
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    
    if (token) {
      await db.session.deleteMany({
        where: { token },
      });
    }

    const response = NextResponse.json({ message: 'تم تسجيل الخروج' });
    
    response.cookies.set('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0),
      path: '/',
    });
    
    response.cookies.set('refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0),
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'تم تسجيل الخروج' });
  }
}
