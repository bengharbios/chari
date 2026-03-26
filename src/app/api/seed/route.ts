import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// Demo accounts data
const DEMO_ACCOUNTS = [
  {
    email: 'admin@chariday.dz',
    phone: '0555000001',
    password: 'demo123456',
    name: 'مدير النظام',
    nameAr: 'مدير النظام',
    userType: 'ADMIN',
    roleName: 'ADMIN',
  },
  {
    email: 'superadmin@chariday.dz',
    phone: '0555000002',
    password: 'demo123456',
    name: 'المشرف العام',
    nameAr: 'المشرف العام',
    userType: 'ADMIN',
    roleName: 'SUPER_ADMIN',
  },
  {
    email: 'seller@chariday.dz',
    phone: '0555000003',
    password: 'demo123456',
    name: 'أحمد التاجر',
    nameAr: 'أحمد التاجر',
    userType: 'SELLER',
    roleName: 'SELLER',
  },
  {
    email: 'store@chariday.dz',
    phone: '0555000004',
    password: 'demo123456',
    name: 'متجر التقنية',
    nameAr: 'متجر التقنية',
    userType: 'STORE',
    roleName: 'STORE',
  },
  {
    email: 'buyer@chariday.dz',
    phone: '0555000005',
    password: 'demo123456',
    name: 'محمد المشتري',
    nameAr: 'محمد المشتري',
    userType: 'BUYER',
    roleName: 'BUYER',
  },
];

// Categories data
const CATEGORIES = [
  { name: 'Electronics', nameAr: 'الإلكترونيات', icon: '📱' },
  { name: 'Fashion', nameAr: 'الموضة', icon: '👕' },
  { name: 'Home & Kitchen', nameAr: 'المنزل والمطبخ', icon: '🏠' },
  { name: 'Beauty', nameAr: 'الجمال والعناية', icon: '💄' },
  { name: 'Sports', nameAr: 'الرياضة', icon: '⚽' },
  { name: 'Baby & Kids', nameAr: 'الأم والطفل', icon: '👶' },
];

// GET /api/seed - Get demo accounts info
export async function GET() {
  return NextResponse.json({
    message: 'Demo accounts available',
    accounts: DEMO_ACCOUNTS.map(acc => ({
      email: acc.email,
      phone: acc.phone,
      userType: acc.userType,
      name: acc.name,
    })),
  });
}

// POST /api/seed - Create demo accounts and data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'create-roles') {
      return await createRoles();
    } else if (action === 'create-accounts') {
      return await createDemoAccounts();
    } else if (action === 'create-categories') {
      return await createCategories();
    } else if (action === 'create-all') {
      await createRoles();
      await createDemoAccounts();
      await createCategories();
      return NextResponse.json({
        message: 'تم إنشاء جميع البيانات التجريبية بنجاح',
        accounts: DEMO_ACCOUNTS.map(acc => ({
          email: acc.email,
          password: acc.password,
          userType: acc.userType,
        })),
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء البيانات' },
      { status: 500 }
    );
  }
}

async function createRoles() {
  const roles = [
    { name: 'SUPER_ADMIN', nameAr: 'مشرف عام', permissions: JSON.stringify(['all']) },
    { name: 'ADMIN', nameAr: 'مدير', permissions: JSON.stringify(['users:read', 'users:write', 'products:read', 'products:write']) },
    { name: 'CONTENT_MANAGER', nameAr: 'مدير محتوى', permissions: JSON.stringify(['products:read', 'products:write']) },
    { name: 'OPERATIONS_MANAGER', nameAr: 'مدير عمليات', permissions: JSON.stringify(['orders:read', 'orders:write']) },
    { name: 'CUSTOMER_SERVICE', nameAr: 'خدمة عملاء', permissions: JSON.stringify(['orders:read', 'customers:read']) },
    { name: 'FINANCIAL_REVIEWER', nameAr: 'مراجع مالي', permissions: JSON.stringify(['payments:read', 'settlements:read']) },
    { name: 'SELLER', nameAr: 'تاجر مستقل', permissions: JSON.stringify(['products:read', 'products:write', 'orders:read']) },
    { name: 'STORE', nameAr: 'متجر', permissions: JSON.stringify(['products:read', 'products:write', 'orders:read', 'orders:write']) },
    { name: 'BUYER', nameAr: 'مشتري', permissions: JSON.stringify(['cart:read', 'cart:write', 'orders:read']) },
  ];

  for (const role of roles) {
    await db.role.upsert({
      where: { name: role.name },
      update: { nameAr: role.nameAr, permissions: role.permissions },
      create: role,
    });
  }

  return NextResponse.json({ message: 'تم إنشاء الأدوار بنجاح' });
}

async function createDemoAccounts() {
  const hashedPassword = await bcrypt.hash('demo123456', 10);
  const createdAccounts = [];

  for (const account of DEMO_ACCOUNTS) {
    // Get role
    const role = await db.role.findFirst({
      where: { name: account.roleName },
    });

    if (!role) {
      console.error(`Role not found: ${account.roleName}`);
      continue;
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email: account.email },
    });

    if (existingUser) {
      createdAccounts.push({
        email: account.email,
        password: account.password,
        userType: account.userType,
        status: 'already exists',
      });
      continue;
    }

    // Create user
    const user = await db.user.create({
      data: {
        email: account.email,
        phone: account.phone,
        password: hashedPassword,
        name: account.name,
        nameAr: account.nameAr,
        roleId: role.id,
        userType: account.userType,
        status: 'ACTIVE',
        emailVerified: new Date(),
        phoneVerified: new Date(),
      },
    });

    // Create related records based on user type
    if (account.userType === 'BUYER') {
      await db.buyer.create({
        data: { userId: user.id },
      });
    } else if (account.userType === 'SELLER') {
      await db.seller.create({
        data: {
          userId: user.id,
          businessName: account.name,
          businessNameAr: account.nameAr,
          status: 'ACTIVE',
        },
      });
    } else if (account.userType === 'STORE') {
      const slug = account.name.toLowerCase().replace(/\s+/g, '-') + '-' + uuidv4().slice(0, 8);
      await db.store.create({
        data: {
          userId: user.id,
          storeName: account.name,
          storeNameAr: account.nameAr,
          slug,
          verificationStatus: 'VERIFIED',
          verificationDate: new Date(),
          status: 'ACTIVE',
        },
      });
    }

    createdAccounts.push({
      email: account.email,
      password: account.password,
      userType: account.userType,
      status: 'created',
    });
  }

  return NextResponse.json({
    message: 'تم إنشاء الحسابات التجريبية',
    accounts: createdAccounts,
  });
}

async function createCategories() {
  for (const category of CATEGORIES) {
    const slug = category.name.toLowerCase().replace(/\s+/g, '-');
    
    await db.category.upsert({
      where: { slug },
      update: { nameAr: category.nameAr },
      create: {
        name: category.name,
        nameAr: category.nameAr,
        slug,
        icon: category.icon,
      },
    });
  }

  return NextResponse.json({ message: 'تم إنشاء الفئات بنجاح' });
}
