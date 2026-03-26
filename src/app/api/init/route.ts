import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// GET /api/init - Initialize database with roles and admin user
export async function GET() {
  try {
    // Check if already initialized
    const rolesCount = await db.role.count();
    
    if (rolesCount > 0) {
      return NextResponse.json({
        message: 'قاعدة البيانات مهيأة بالفعل',
        status: 'already_initialized',
      });
    }

    // Create roles
    const roles = await createRoles();
    
    // Create admin user
    const admin = await createAdminUser();

    return NextResponse.json({
      message: 'تم تهيئة قاعدة البيانات بنجاح',
      status: 'initialized',
      roles: roles.length,
      admin: {
        email: admin.email,
        password: 'admin123456',
        userType: admin.userType,
      },
    });
  } catch (error: any) {
    console.error('Init error:', error);
    return NextResponse.json(
      { 
        error: 'حدث خطأ أثناء تهيئة قاعدة البيانات',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

async function createRoles() {
  const rolesData = [
    { name: 'SUPER_ADMIN', nameAr: 'مشرف عام', permissions: JSON.stringify(['all']) },
    { name: 'ADMIN', nameAr: 'مدير', permissions: JSON.stringify(['users:read', 'users:write', 'products:read', 'products:write', 'orders:read', 'orders:write']) },
    { name: 'CONTENT_MANAGER', nameAr: 'مدير محتوى', permissions: JSON.stringify(['products:read', 'products:write']) },
    { name: 'OPERATIONS_MANAGER', nameAr: 'مدير عمليات', permissions: JSON.stringify(['orders:read', 'orders:write']) },
    { name: 'CUSTOMER_SERVICE', nameAr: 'خدمة عملاء', permissions: JSON.stringify(['orders:read', 'customers:read']) },
    { name: 'FINANCIAL_REVIEWER', nameAr: 'مراجع مالي', permissions: JSON.stringify(['payments:read', 'settlements:read']) },
    { name: 'SELLER', nameAr: 'تاجر مستقل', permissions: JSON.stringify(['products:read', 'products:write', 'orders:read']) },
    { name: 'STORE', nameAr: 'متجر', permissions: JSON.stringify(['products:read', 'products:write', 'orders:read', 'orders:write']) },
    { name: 'BUYER', nameAr: 'مشتري', permissions: JSON.stringify(['cart:read', 'cart:write', 'orders:read']) },
  ];

  const createdRoles = [];
  for (const role of rolesData) {
    const created = await db.role.create({
      data: role,
    });
    createdRoles.push(created);
  }

  return createdRoles;
}

async function createAdminUser() {
  const adminRole = await db.role.findFirst({
    where: { name: 'SUPER_ADMIN' },
  });

  if (!adminRole) {
    throw new Error('Admin role not found');
  }

  const hashedPassword = await bcrypt.hash('admin123456', 10);

  const admin = await db.user.create({
    data: {
      email: 'admin@chariday.dz',
      phone: '0555000000',
      password: hashedPassword,
      name: 'مدير النظام',
      nameAr: 'مدير النظام',
      roleId: adminRole.id,
      userType: 'ADMIN',
      status: 'ACTIVE',
      emailVerified: new Date(),
      phoneVerified: new Date(),
    },
  });

  return admin;
}
