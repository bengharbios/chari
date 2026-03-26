import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

// GET /api/init - Initialize database with roles and admin user
export async function GET() {
  try {
    // First, try to push the schema to create tables
    const prisma = new PrismaClient();
    
    // Test database connection
    await prisma.$connect();
    
    // Check if Role table exists by trying to count
    let rolesCount = 0;
    try {
      rolesCount = await prisma.role.count();
    } catch (e: any) {
      // Table doesn't exist, need to create it
      // We'll create the tables using raw SQL
      return NextResponse.json({
        status: 'database_connected',
        message: 'Database connected but tables not found. Please run: npx prisma db push',
        error: e.message,
      });
    }
    
    if (rolesCount > 0) {
      return NextResponse.json({
        message: 'قاعدة البيانات مهيأة بالفعل',
        status: 'already_initialized',
        rolesCount,
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

// POST /api/init - Create tables using raw SQL
export async function POST() {
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
    
    // Create Role table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS Role (
        id VARCHAR(191) PRIMARY KEY,
        name VARCHAR(191) UNIQUE NOT NULL,
        nameAr VARCHAR(191) NOT NULL,
        description TEXT,
        permissions TEXT NOT NULL,
        createdAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create User table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS User (
        id VARCHAR(191) PRIMARY KEY,
        email VARCHAR(191) UNIQUE NOT NULL,
        phone VARCHAR(191) UNIQUE NOT NULL,
        password VARCHAR(191) NOT NULL,
        name VARCHAR(191),
        nameAr VARCHAR(191),
        username VARCHAR(191) UNIQUE,
        avatar VARCHAR(191),
        gender VARCHAR(191),
        roleId VARCHAR(191) NOT NULL,
        userType VARCHAR(191) NOT NULL,
        status VARCHAR(191) DEFAULT 'PENDING',
        emailVerified DATETIME(3),
        phoneVerified DATETIME(3),
        twoFactorEnabled BOOLEAN DEFAULT false,
        twoFactorSecret VARCHAR(191),
        twoFactorMethod VARCHAR(191),
        loginAttempts INT DEFAULT 0,
        lockedUntil DATETIME(3),
        passwordChangedAt DATETIME(3),
        locale VARCHAR(191) DEFAULT 'ar',
        timezone VARCHAR(191) DEFAULT 'Africa/Algiers',
        currency VARCHAR(191) DEFAULT 'DZD',
        referralCode VARCHAR(191) UNIQUE,
        referredBy VARCHAR(191),
        lastLoginAt DATETIME(3),
        lastLoginIp VARCHAR(191),
        createdAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt DATETIME(3),
        FOREIGN KEY (roleId) REFERENCES Role(id)
      )
    `);

    // Create Session table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS Session (
        id VARCHAR(191) PRIMARY KEY,
        userId VARCHAR(191) NOT NULL,
        token VARCHAR(191) UNIQUE NOT NULL,
        refreshToken VARCHAR(191) UNIQUE NOT NULL,
        expiresAt DATETIME(3) NOT NULL,
        createdAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
      )
    `);

    // Create roles
    const roles = await createRoles();
    
    // Create admin user
    const admin = await createAdminUser();

    return NextResponse.json({
      message: 'تم إنشاء الجداول وتهيئة قاعدة البيانات بنجاح',
      status: 'initialized',
      admin: {
        email: admin.email,
        password: 'admin123456',
      },
    });
  } catch (error: any) {
    console.error('Init POST error:', error);
    return NextResponse.json(
      { 
        error: 'حدث خطأ أثناء إنشاء الجداول',
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
      id: uuidv4(),
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
