// ChariDay Types - أنواع المنصة

// ============================================
// المستخدمون - Users
// ============================================

export type UserRole = 
  | 'SUPER_ADMIN'      // مشرف عام
  | 'ADMIN'            // مدير
  | 'CONTENT_MANAGER'  // مدير محتوى
  | 'OPERATIONS_MANAGER' // مدير عمليات
  | 'CUSTOMER_SERVICE' // خدمة عملاء
  | 'FINANCIAL_REVIEWER' // مراجع مالي
  | 'SELLER'           // تاجر مستقل
  | 'STORE'            // متجر
  | 'BUYER';           // مشتري

export type UserStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'BANNED';

export interface User {
  id: string;
  email: string;
  phone: string;
  name?: string;
  nameAr?: string;
  avatar?: string;
  roleId: string;
  role?: Role;
  userType: UserRole;
  status: UserStatus;
  emailVerified?: Date;
  phoneVerified?: Date;
  twoFactorEnabled: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: string;
  name: string;
  nameAr: string;
  description?: string;
  permissions: string[];
}

// ============================================
// التجار والمتاجر - Sellers & Stores
// ============================================

export type SubscriptionPlan = 'FREE' | 'BASIC' | 'PRO' | 'PREMIUM';
export type VerificationStatus = 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED';

export interface Seller {
  id: string;
  userId: string;
  user?: User;
  businessName?: string;
  businessNameAr?: string;
  description?: string;
  logo?: string;
  coverImage?: string;
  subscriptionPlan: SubscriptionPlan;
  subscriptionEndsAt?: Date;
  commissionRate: number;
  totalSales: number;
  totalOrders: number;
  rating: number;
  totalReviews: number;
  status: UserStatus;
  upgradeRequested: boolean;
  upgradeStatus?: VerificationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Store {
  id: string;
  userId: string;
  user?: User;
  storeName: string;
  storeNameAr: string;
  slug: string;
  description?: string;
  logo?: string;
  coverImage?: string;
  businessEmail?: string;
  businessPhone?: string;
  commercialRegister?: string;
  taxNumber?: string;
  verificationStatus: VerificationStatus;
  verificationDate?: Date;
  rejectionReason?: string;
  subscriptionPlan: SubscriptionPlan;
  subscriptionEndsAt?: Date;
  commissionRate: number;
  totalSales: number;
  totalOrders: number;
  rating: number;
  totalReviews: number;
  followersCount: number;
  primaryColor?: string;
  secondaryColor?: string;
  customDomain?: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Buyer {
  id: string;
  userId: string;
  user?: User;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
  preferredLanguage: 'ar' | 'fr' | 'en';
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// المنتجات - Products
// ============================================

export type ProductStatus = 'DRAFT' | 'PENDING_REVIEW' | 'ACTIVE' | 'INACTIVE' | 'REJECTED';

export interface Product {
  id: string;
  sellerId?: string;
  storeId?: string;
  seller?: Seller;
  store?: Store;
  
  // Basic Info
  name: string;
  nameAr: string;
  slug: string;
  description?: string;
  descriptionAr?: string;
  shortDescription?: string;
  shortDescriptionAr?: string;
  highlights?: string[];
  highlightsAr?: string[];
  
  // Classification
  categoryId: string;
  category?: Category;
  brandId?: string;
  brand?: Brand;
  tags?: string[];
  
  // Price & Quantity
  basePrice: number;
  salePrice?: number;
  costPrice?: number;
  currency: string;
  quantity: number;
  lowStockThreshold: number;
  
  // SKU & Barcode
  sku: string;
  barcode?: string;
  
  // Shipping
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  shippingFromCity?: string;
  freeShipping: boolean;
  
  // Video
  videoUrl?: string;
  
  // SEO
  metaTitle?: string;
  metaTitleAr?: string;
  metaDescription?: string;
  metaDescriptionAr?: string;
  metaKeywords?: string;
  
  // Rating
  rating: number;
  totalReviews: number;
  totalSales: number;
  
  // Status
  status: ProductStatus;
  rejectionReason?: string;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  images?: ProductImage[];
  variants?: ProductVariant[];
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt?: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  nameAr: string;
  sku: string;
  barcode?: string;
  price: number;
  salePrice?: number;
  quantity: number;
  attributes: Record<string, string>;
  image?: string;
  isActive: boolean;
}

// ============================================
// الفئات والعلامات التجارية
// ============================================

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  description?: string;
  descriptionAr?: string;
  image?: string;
  icon?: string;
  parentId?: string;
  parent?: Category;
  children?: Category[];
  sortOrder: number;
  isActive: boolean;
  showInMenu: boolean;
  showInHome: boolean;
}

export interface Brand {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  logo?: string;
  description?: string;
  isActive: boolean;
  isFeatured: boolean;
}

// ============================================
// الطلبات - Orders
// ============================================

export type OrderStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'PROCESSING' 
  | 'SHIPPED' 
  | 'DELIVERED' 
  | 'CANCELLED' 
  | 'RETURNED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'CASH_ON_DELIVERY' | 'CARD' | 'WALLET';

export interface Order {
  id: string;
  orderNumber: string;
  buyerId?: string;
  sellerId?: string;
  storeId?: string;
  buyer?: Buyer;
  seller?: Seller;
  store?: Store;
  userId: string;
  user?: User;
  
  // Shipping
  shippingAddressId: string;
  shippingAddress?: Address;
  shippingMethod?: string;
  shippingCost: number;
  trackingNumber?: string;
  
  // Payment
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  
  // Amounts
  subtotal: number;
  discount: number;
  couponId?: string;
  coupon?: Coupon;
  tax: number;
  total: number;
  commissionAmount: number;
  
  // Status
  status: OrderStatus;
  statusHistory?: OrderStatusUpdate[];
  
  // Notes
  notes?: string;
  cancellationReason?: string;
  
  createdAt: Date;
  updatedAt: Date;
  
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  product?: Product;
  variant?: ProductVariant;
  name: string;
  nameAr: string;
  image?: string;
  quantity: number;
  price: number;
  salePrice?: number;
  total: number;
}

export interface OrderStatusUpdate {
  id: string;
  orderId: string;
  status: OrderStatus;
  note?: string;
  updatedBy: string;
  createdAt: Date;
}

// ============================================
// العناوين - Addresses
// ============================================

export interface Address {
  id: string;
  userId: string;
  buyerId?: string;
  label: string;
  fullName: string;
  phone: string;
  country: string;
  province: string;
  city: string;
  address: string;
  postalCode?: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
}

// ============================================
// الكوبونات والعروض
// ============================================

export type CouponType = 'PERCENTAGE' | 'FIXED';

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  applicableTo?: 'ALL' | 'SPECIFIC_CATEGORIES' | 'SPECIFIC_PRODUCTS';
  applicableIds?: string[];
}

export interface FlashSale {
  id: string;
  title: string;
  titleAr: string;
  description?: string;
  image?: string;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  items?: FlashSaleItem[];
}

export interface FlashSaleItem {
  id: string;
  flashSaleId: string;
  productId: string;
  product?: Product;
  salePrice: number;
  quantity: number;
  soldCount: number;
  isActive: boolean;
}

// ============================================
// التقييمات - Reviews
// ============================================

export interface Review {
  id: string;
  productId: string;
  userId: string;
  buyerId?: string;
  product?: Product;
  user?: User;
  buyer?: Buyer;
  rating: number;
  title?: string;
  titleAr?: string;
  comment?: string;
  commentAr?: string;
  images?: string[];
  isVerified: boolean;
  isApproved: boolean;
  helpfulCount: number;
  createdAt: Date;
}

// ============================================
// قائمة الأمنيات - Wishlist
// ============================================

export interface Wishlist {
  id: string;
  userId: string;
  buyerId?: string;
  name?: string;
  isDefault: boolean;
  items?: WishlistItem[];
}

export interface WishlistItem {
  id: string;
  wishlistId: string;
  productId: string;
  product?: Product;
  createdAt: Date;
}

// ============================================
// الصفحة الرئيسية - Homepage
// ============================================

export type HomepageSectionType = 
  | 'FEATURED_DEALS' 
  | 'FLASH_SALE' 
  | 'CATEGORIES' 
  | 'BEST_SELLERS' 
  | 'NEW_ARRIVALS' 
  | 'RECOMMENDED' 
  | 'BANNERS' 
  | 'FEATURED_STORES' 
  | 'REVIEWS';

export interface HomepageSlider {
  id: string;
  title?: string;
  titleAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  image: string;
  imageMobile?: string;
  link?: string;
  buttonText?: string;
  buttonTextAr?: string;
  sortOrder: number;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface HomepageSection {
  id: string;
  type: HomepageSectionType;
  title?: string;
  titleAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  config?: Record<string, unknown>;
  sortOrder: number;
  isActive: boolean;
}

export interface Banner {
  id: string;
  title?: string;
  titleAr?: string;
  image: string;
  imageMobile?: string;
  link?: string;
  position: 'HOME_TOP' | 'HOME_MIDDLE' | 'HOME_BOTTOM' | 'CATEGORY' | 'SIDEBAR';
  categoryIds?: string[];
  sortOrder: number;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
}

// ============================================
// الاشتراكات - Subscriptions
// ============================================

export interface SubscriptionPlanDetails {
  id: string;
  name: string;
  nameAr: string;
  description?: string;
  descriptionAr?: string;
  price: number;
  duration: number;
  maxProducts: number;
  maxImagesPerProduct: number;
  maxVariantsPerProduct: number;
  commissionRate: number;
  featuredListing: boolean;
  customStorePage: boolean;
  advancedAnalytics: boolean;
  prioritySupport: boolean;
  isActive: boolean;
}

// ============================================
// الإشعارات - Notifications
// ============================================

export type NotificationType = 'ORDER' | 'PROMOTION' | 'SYSTEM' | 'VERIFICATION';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
}

// ============================================
// الولاية الجزائرية - Algerian Provinces
// ============================================

export interface AlgerianProvince {
  code: number;
  name: string;
  nameAr: string;
}
