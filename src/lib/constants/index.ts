// ChariDay Constants - ثوابت المنصة

// ============================================
// الولايات الجزائرية - Algerian Provinces (58 Wilayas)
// ============================================

export const ALGERIAN_PROVINCES = [
  { code: 1, name: 'Adrar', nameAr: 'أدرار' },
  { code: 2, name: 'Chlef', nameAr: 'الشلف' },
  { code: 3, name: 'Laghouat', nameAr: 'الأغواط' },
  { code: 4, name: 'Oum El Bouaghi', nameAr: 'أم البواقي' },
  { code: 5, name: 'Batna', nameAr: 'باتنة' },
  { code: 6, name: 'Béjaïa', nameAr: 'بجاية' },
  { code: 7, name: 'Biskra', nameAr: 'بسكرة' },
  { code: 8, name: 'Béchar', nameAr: 'بشار' },
  { code: 9, name: 'Blida', nameAr: 'البليدة' },
  { code: 10, name: 'Bouira', nameAr: 'البويرة' },
  { code: 11, name: 'Tamanrasset', nameAr: 'تمنراست' },
  { code: 12, name: 'Tébessa', nameAr: 'تبسة' },
  { code: 13, name: 'Tlemcen', nameAr: 'تلمسان' },
  { code: 14, name: 'Tiaret', nameAr: 'تيارت' },
  { code: 15, name: 'Tizi Ouzou', nameAr: 'تيزي وزو' },
  { code: 16, name: 'Algiers', nameAr: 'الجزائر' },
  { code: 17, name: 'Djelfa', nameAr: 'الجلفة' },
  { code: 18, name: 'Jijel', nameAr: 'جيجل' },
  { code: 19, name: 'Sétif', nameAr: 'سطيف' },
  { code: 20, name: 'Saïda', nameAr: 'سعيدة' },
  { code: 21, name: 'Skikda', nameAr: 'سكيكدة' },
  { code: 22, name: 'Sidi Bel Abbès', nameAr: 'سيدي بلعباس' },
  { code: 23, name: 'Annaba', nameAr: 'عنابة' },
  { code: 24, name: 'Guelma', nameAr: 'قالمة' },
  { code: 25, name: 'Constantine', nameAr: 'قسنطينة' },
  { code: 26, name: 'Médéa', nameAr: 'المدية' },
  { code: 27, name: 'Mostaganem', nameAr: 'مستغانم' },
  { code: 28, name: 'M\'Sila', nameAr: 'المسيلة' },
  { code: 29, name: 'Mascara', nameAr: 'معسكر' },
  { code: 30, name: 'Ouargla', nameAr: 'ورقلة' },
  { code: 31, name: 'Oran', nameAr: 'وهران' },
  { code: 32, name: 'El Bayadh', nameAr: 'البيض' },
  { code: 33, name: 'Illizi', nameAr: 'إليزي' },
  { code: 34, name: 'Bordj Bou Arréridj', nameAr: 'برج بوعريريج' },
  { code: 35, name: 'Boumerdès', nameAr: 'بومرداس' },
  { code: 36, name: 'El Tarf', nameAr: 'الطارف' },
  { code: 37, name: 'Tindouf', nameAr: 'تندوف' },
  { code: 38, name: 'Tissemsilt', nameAr: 'تيسمسيلت' },
  { code: 39, name: 'El Oued', nameAr: 'الوادي' },
  { code: 40, name: 'Khenchela', nameAr: 'خنشلة' },
  { code: 41, name: 'Souk Ahras', nameAr: 'سوق أهراس' },
  { code: 42, name: 'Tipaza', nameAr: 'تيبازة' },
  { code: 43, name: 'Mila', nameAr: 'ميلة' },
  { code: 44, name: 'Aïn Defla', nameAr: 'عين الدفلى' },
  { code: 45, name: 'Naâma', nameAr: 'النعامة' },
  { code: 46, name: 'Aïn Témouchent', nameAr: 'عين تموشنت' },
  { code: 47, name: 'Ghardaïa', nameAr: 'غرداية' },
  { code: 48, name: 'Relizane', nameAr: 'غليزان' },
  { code: 49, name: 'Timimoun', nameAr: 'تيميمون' },
  { code: 50, name: 'Bordj Badji Mokhtar', nameAr: 'برج باجي مختار' },
  { code: 51, name: 'Ouled Djellal', nameAr: 'أولاد جلال' },
  { code: 52, name: 'Béni Abbès', nameAr: 'بني عباس' },
  { code: 53, name: 'In Salah', nameAr: 'عين صالح' },
  { code: 54, name: 'In Guezzam', nameAr: 'عين قزام' },
  { code: 55, name: 'Touggourt', nameAr: 'تقرت' },
  { code: 56, name: 'Djanet', nameAr: 'جانت' },
  { code: 57, name: 'El M\'Ghair', nameAr: 'المغير' },
  { code: 58, name: 'El Meniaa', nameAr: 'المنيعة' },
] as const;

// ============================================
// أدوار المستخدمين - User Roles
// ============================================

export const USER_ROLES = {
  SUPER_ADMIN: {
    name: 'SUPER_ADMIN',
    nameAr: 'مشرف عام',
    permissions: ['all'],
  },
  ADMIN: {
    name: 'ADMIN',
    nameAr: 'مدير',
    permissions: ['users:read', 'users:write', 'products:read', 'products:write', 'orders:read', 'orders:write'],
  },
  CONTENT_MANAGER: {
    name: 'CONTENT_MANAGER',
    nameAr: 'مدير محتوى',
    permissions: ['products:read', 'products:write', 'categories:read', 'categories:write', 'brands:read', 'brands:write'],
  },
  OPERATIONS_MANAGER: {
    name: 'OPERATIONS_MANAGER',
    nameAr: 'مدير عمليات',
    permissions: ['orders:read', 'orders:write', 'shipping:read', 'shipping:write'],
  },
  CUSTOMER_SERVICE: {
    name: 'CUSTOMER_SERVICE',
    nameAr: 'خدمة عملاء',
    permissions: ['orders:read', 'orders:write', 'customers:read', 'reviews:read', 'reviews:write'],
  },
  FINANCIAL_REVIEWER: {
    name: 'FINANCIAL_REVIEWER',
    nameAr: 'مراجع مالي',
    permissions: ['payments:read', 'payments:write', 'settlements:read', 'settlements:write'],
  },
  SELLER: {
    name: 'SELLER',
    nameAr: 'تاجر مستقل',
    permissions: ['products:read', 'products:write', 'orders:read'],
  },
  STORE: {
    name: 'STORE',
    nameAr: 'متجر',
    permissions: ['products:read', 'products:write', 'orders:read', 'orders:write', 'analytics:read'],
  },
  BUYER: {
    name: 'BUYER',
    nameAr: 'مشتري',
    permissions: ['cart:read', 'cart:write', 'orders:read', 'wishlist:read', 'wishlist:write'],
  },
} as const;

// ============================================
// حالات الطلب - Order Status
// ============================================

export const ORDER_STATUS = {
  PENDING: {
    name: 'PENDING',
    nameAr: 'قيد الانتظار',
    color: 'yellow',
    description: 'الطلب في انتظار التأكيد',
  },
  CONFIRMED: {
    name: 'CONFIRMED',
    nameAr: 'مؤكد',
    color: 'blue',
    description: 'تم تأكيد الطلب',
  },
  PROCESSING: {
    name: 'PROCESSING',
    nameAr: 'قيد التجهيز',
    color: 'orange',
    description: 'جاري تجهيز الطلب',
  },
  SHIPPED: {
    name: 'SHIPPED',
    nameAr: 'تم الشحن',
    color: 'purple',
    description: 'تم شحن الطلب',
  },
  DELIVERED: {
    name: 'DELIVERED',
    nameAr: 'تم التسليم',
    color: 'green',
    description: 'تم تسليم الطلب',
  },
  CANCELLED: {
    name: 'CANCELLED',
    nameAr: 'ملغي',
    color: 'red',
    description: 'تم إلغاء الطلب',
  },
  RETURNED: {
    name: 'RETURNED',
    nameAr: 'مرتجع',
    color: 'gray',
    description: 'تم إرجاع الطلب',
  },
} as const;

// ============================================
// حالات الدفع - Payment Status
// ============================================

export const PAYMENT_STATUS = {
  PENDING: { name: 'PENDING', nameAr: 'قيد الانتظار', color: 'yellow' },
  PAID: { name: 'PAID', nameAr: 'مدفوع', color: 'green' },
  FAILED: { name: 'FAILED', nameAr: 'فشل', color: 'red' },
  REFUNDED: { name: 'REFUNDED', nameAr: 'مسترد', color: 'gray' },
} as const;

// ============================================
// طرق الدفع - Payment Methods
// ============================================

export const PAYMENT_METHODS = {
  CASH_ON_DELIVERY: { name: 'CASH_ON_DELIVERY', nameAr: 'الدفع عند الاستلام', icon: 'banknote' },
  CARD: { name: 'CARD', nameAr: 'بطاقة بنكية', icon: 'credit-card' },
  WALLET: { name: 'WALLET', nameAr: 'المحفظة', icon: 'wallet' },
} as const;

// ============================================
// باقات الاشتراك - Subscription Plans
// ============================================

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'FREE',
    nameAr: 'مجاني',
    price: 0,
    duration: 0, // غير محدود
    maxProducts: 10,
    maxImagesPerProduct: 3,
    maxVariantsPerProduct: 2,
    commissionRate: 15,
    features: {
      featuredListing: false,
      customStorePage: false,
      advancedAnalytics: false,
      prioritySupport: false,
    },
  },
  BASIC: {
    name: 'BASIC',
    nameAr: 'أساسي',
    price: 2500, // دج
    duration: 30, // يوم
    maxProducts: 50,
    maxImagesPerProduct: 5,
    maxVariantsPerProduct: 5,
    commissionRate: 12,
    features: {
      featuredListing: false,
      customStorePage: false,
      advancedAnalytics: true,
      prioritySupport: false,
    },
  },
  PRO: {
    name: 'PRO',
    nameAr: 'احترافي',
    price: 5000, // دج
    duration: 30,
    maxProducts: 200,
    maxImagesPerProduct: 8,
    maxVariantsPerProduct: 10,
    commissionRate: 10,
    features: {
      featuredListing: true,
      customStorePage: true,
      advancedAnalytics: true,
      prioritySupport: true,
    },
  },
  PREMIUM: {
    name: 'PREMIUM',
    nameAr: 'مميز',
    price: 10000, // دج
    duration: 30,
    maxProducts: -1, // غير محدود
    maxImagesPerProduct: 10,
    maxVariantsPerProduct: 20,
    commissionRate: 8,
    features: {
      featuredListing: true,
      customStorePage: true,
      advancedAnalytics: true,
      prioritySupport: true,
    },
  },
} as const;

// ============================================
// حالات المنتج - Product Status
// ============================================

export const PRODUCT_STATUS = {
  DRAFT: { name: 'DRAFT', nameAr: 'مسودة', color: 'gray' },
  PENDING_REVIEW: { name: 'PENDING_REVIEW', nameAr: 'قيد المراجعة', color: 'yellow' },
  ACTIVE: { name: 'ACTIVE', nameAr: 'نشط', color: 'green' },
  INACTIVE: { name: 'INACTIVE', nameAr: 'غير نشط', color: 'orange' },
  REJECTED: { name: 'REJECTED', nameAr: 'مرفوض', color: 'red' },
} as const;

// ============================================
// حالات التوثيق - Verification Status
// ============================================

export const VERIFICATION_STATUS = {
  PENDING: { name: 'PENDING', nameAr: 'قيد المراجعة', color: 'yellow' },
  UNDER_REVIEW: { name: 'UNDER_REVIEW', nameAr: 'جاري المراجعة', color: 'blue' },
  VERIFIED: { name: 'VERIFIED', nameAr: 'موثق', color: 'green' },
  REJECTED: { name: 'REJECTED', nameAr: 'مرفوض', color: 'red' },
} as const;

// ============================================
// أنواع المستندات - Document Types
// ============================================

export const DOCUMENT_TYPES = {
  COMMERCIAL_REGISTER: { name: 'COMMERCIAL_REGISTER', nameAr: 'السجل التجاري' },
  ID_FRONT: { name: 'ID_FRONT', nameAr: 'بطاقة التعريف (الوجه)' },
  ID_BACK: { name: 'ID_BACK', nameAr: 'بطاقة التعريف (الخلف)' },
  SELFIE_FRONT: { name: 'SELFIE_FRONT', nameAr: 'صورة سيلفي (أمام)' },
  SELFIE_RIGHT: { name: 'SELFIE_RIGHT', nameAr: 'صورة سيلفي (إمالة يمين)' },
  SELFIE_LEFT: { name: 'SELFIE_LEFT', nameAr: 'صورة سيلفي (إمالة يسار)' },
  SELFIE_BLINK: { name: 'SELFIE_BLINK', nameAr: 'صورة سيلفي (رمشة)' },
} as const;

// ============================================
// أقسام الصفحة الرئيسية - Homepage Sections
// ============================================

export const HOMEPAGE_SECTIONS = {
  SLIDER: { name: 'SLIDER', nameAr: 'السلايدر الرئيسي', order: 1 },
  FEATURED_DEALS: { name: 'FEATURED_DEALS', nameAr: 'العروض المميزة', order: 2 },
  FLASH_SALE: { name: 'FLASH_SALE', nameAr: 'تخفيضات فلاش', order: 3 },
  CATEGORIES: { name: 'CATEGORIES', nameAr: 'الفئات الرئيسية', order: 4 },
  BEST_SELLERS: { name: 'BEST_SELLERS', nameAr: 'الأكثر مبيعاً', order: 5 },
  NEW_ARRIVALS: { name: 'NEW_ARRIVALS', nameAr: 'أحدث المنتجات', order: 6 },
  RECOMMENDED: { name: 'RECOMMENDED', nameAr: 'منتجات مقترحة', order: 7 },
  BANNERS: { name: 'BANNERS', nameAr: 'بانرات إعلانية', order: 8 },
  FEATURED_STORES: { name: 'FEATURED_STORES', nameAr: 'متاجر مميزة', order: 9 },
  REVIEWS: { name: 'REVIEWS', nameAr: 'تقييمات العملاء', order: 10 },
} as const;

// ============================================
// إعدادات التطبيق - App Settings
// ============================================

export const APP_SETTINGS = {
  siteName: 'ChariDay',
  siteNameAr: 'شاري داي',
  siteDescription: 'منصة التجارة الإلكترونية الرائدة في الجزائر',
  defaultCurrency: 'DZD',
  defaultLanguage: 'ar',
  supportedLanguages: ['ar', 'fr', 'en'],
  itemsPerPage: 20,
  maxUploadSize: 5 * 1024 * 1024, // 5MB
  supportedImageFormats: ['image/jpeg', 'image/png', 'image/webp'],
  otpExpiration: 5 * 60 * 1000, // 5 دقائق
  sessionTimeout: 7 * 24 * 60 * 60 * 1000, // 7 أيام
} as const;

// ============================================
// روابط التنقل - Navigation Links
// ============================================

export const NAV_LINKS = [
  { href: '/', label: 'الرئيسية', labelEn: 'Home', icon: 'home' },
  { href: '/categories', label: 'الفئات', labelEn: 'Categories', icon: 'grid' },
  { href: '/deals', label: 'العروض', labelEn: 'Deals', icon: 'tag' },
  { href: '/stores', label: 'المتاجر', labelEn: 'Stores', icon: 'store' },
] as const;

export const BOTTOM_NAV_LINKS = [
  { href: '/', label: 'الرئيسية', icon: 'home' },
  { href: '/categories', label: 'الفئات', icon: 'grid' },
  { href: '/search', label: 'بحث', icon: 'search' },
  { href: '/cart', label: 'السلة', icon: 'shopping-cart' },
  { href: '/account', label: 'حسابي', icon: 'user' },
] as const;
