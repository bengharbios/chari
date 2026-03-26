'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav, BottomNavSpacer } from '@/components/layout/BottomNav';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoriesGrid } from '@/components/layout/CategoriesMenu';
import { FlashSaleSection } from '@/components/home/FlashSaleSection';
import { ProductsSection, ProductsScrollSection } from '@/components/home/ProductsSection';
import { FeaturedStoresSection } from '@/components/home/FeaturedStoresSection';
import { BannerGrid, SingleBanner } from '@/components/home/BannerGrid';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { Separator } from '@/components/ui/separator';

// بيانات وهمية للمنتجات
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    nameAr: 'آيفون 15 برو ماكس',
    slug: 'iphone-15-pro-max',
    basePrice: 189900,
    salePrice: 169900,
    images: [{ url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop' }],
    rating: 4.8,
    totalReviews: 256,
    quantity: 50,
    isNewArrival: true,
    store: { storeName: 'Apple Store', storeNameAr: 'متجر آبل' },
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    nameAr: 'سامسونج جالكسي S24 ألترا',
    slug: 'samsung-s24-ultra',
    basePrice: 159900,
    salePrice: 139900,
    images: [{ url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop' }],
    rating: 4.7,
    totalReviews: 189,
    quantity: 35,
    isBestSeller: true,
    store: { storeName: 'Samsung Store', storeNameAr: 'متجر سامسونج' },
  },
  {
    id: '3',
    name: 'MacBook Pro 14"',
    nameAr: 'ماك بوك برو 14 بوصة',
    slug: 'macbook-pro-14',
    basePrice: 299900,
    images: [{ url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop' }],
    rating: 4.9,
    totalReviews: 445,
    quantity: 20,
    isFeatured: true,
    store: { storeName: 'Apple Store', storeNameAr: 'متجر آبل' },
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    nameAr: 'سوني WH-1000XM5 سماعات',
    slug: 'sony-wh1000xm5',
    basePrice: 45000,
    salePrice: 39900,
    images: [{ url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop' }],
    rating: 4.6,
    totalReviews: 312,
    quantity: 100,
    store: { storeName: 'Audio World', storeNameAr: 'عالم الصوت' },
  },
  {
    id: '5',
    name: 'Nike Air Max 270',
    nameAr: 'نايك إير ماكس 270',
    slug: 'nike-air-max-270',
    basePrice: 25000,
    salePrice: 19900,
    images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' }],
    rating: 4.5,
    totalReviews: 567,
    quantity: 200,
    isBestSeller: true,
    store: { storeName: 'Nike Store', storeNameAr: 'متجر نايك' },
  },
  {
    id: '6',
    name: 'Dyson V15 Detect',
    nameAr: 'دايسون V15 كنس كهربائي',
    slug: 'dyson-v15-detect',
    basePrice: 85000,
    images: [{ url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop' }],
    rating: 4.8,
    totalReviews: 234,
    quantity: 45,
    isNewArrival: true,
    store: { storeName: 'Home Appliances', storeNameAr: 'أجهزة منزلية' },
  },
  {
    id: '7',
    name: 'PlayStation 5',
    nameAr: 'بلايستيشن 5',
    slug: 'playstation-5',
    basePrice: 75000,
    salePrice: 69900,
    images: [{ url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop' }],
    rating: 4.9,
    totalReviews: 890,
    quantity: 30,
    isBestSeller: true,
    store: { storeName: 'Gaming Zone', storeNameAr: 'منطقة الألعاب' },
  },
  {
    id: '8',
    name: 'Apple Watch Ultra 2',
    nameAr: 'آبل واتش ألترا 2',
    slug: 'apple-watch-ultra-2',
    basePrice: 95000,
    images: [{ url: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop' }],
    rating: 4.7,
    totalReviews: 156,
    quantity: 60,
    isNewArrival: true,
    store: { storeName: 'Apple Store', storeNameAr: 'متجر آبل' },
  },
];

// بيانات العروض الفلاش
const FLASH_SALE_PRODUCTS = [
  {
    id: 'fs1',
    name: 'AirPods Pro 2',
    nameAr: 'إير بودز برو 2',
    slug: 'airpods-pro-2',
    originalPrice: 45000,
    salePrice: 35900,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=200&h=200&fit=crop',
    soldCount: 156,
    totalQuantity: 200,
  },
  {
    id: 'fs2',
    name: 'Xiaomi Robot Vacuum',
    nameAr: 'شيفط روبوت شاومي',
    slug: 'xiaomi-robot-vacuum',
    originalPrice: 55000,
    salePrice: 42900,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
    soldCount: 89,
    totalQuantity: 150,
  },
  {
    id: 'fs3',
    name: 'Samsung 65" QLED TV',
    nameAr: 'تلفزيون سامسونج 65 بوصة',
    slug: 'samsung-65-qled',
    originalPrice: 250000,
    salePrice: 199900,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop',
    soldCount: 34,
    totalQuantity: 50,
  },
  {
    id: 'fs4',
    name: 'DJI Mini 3 Pro',
    nameAr: 'درون DJI ميني 3 برو',
    slug: 'dji-mini-3-pro',
    originalPrice: 120000,
    salePrice: 99900,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=200&h=200&fit=crop',
    soldCount: 67,
    totalQuantity: 100,
  },
  {
    id: 'fs5',
    name: 'Ray-Ban Sunglasses',
    nameAr: 'نظارات شمسية راي بان',
    slug: 'rayban-sunglasses',
    originalPrice: 28000,
    salePrice: 19900,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop',
    soldCount: 234,
    totalQuantity: 300,
  },
];

// البانرات
const BANNERS = [
  {
    id: 'b1',
    title: 'Electronics',
    titleAr: 'عروض الإلكترونيات',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=300&fit=crop',
    link: '/categories/electronics',
  },
  {
    id: 'b2',
    title: 'Fashion',
    titleAr: 'عروض الموضة',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop',
    link: '/categories/fashion',
  },
];

export default function HomePage() {
  // تاريخ انتهاء العرض الفلاش (بعد 6 ساعات)
  const flashSaleEndTime = new Date(Date.now() + 6 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-4">
          {/* Hero Slider */}
          <HeroSlider />

          {/* Flash Sale */}
          <FlashSaleSection
            endTime={flashSaleEndTime}
            products={FLASH_SALE_PRODUCTS}
          />

          <Separator className="my-4" />

          {/* Categories */}
          <section className="py-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">تصفح حسب الفئة</h2>
            <CategoriesGrid />
          </section>

          <Separator className="my-4" />

          {/* Banner Grid */}
          <section className="py-6">
            <BannerGrid banners={BANNERS} layout="2x1" />
          </section>

          <Separator className="my-4" />

          {/* Best Sellers */}
          <ProductsSection
            title="الأكثر مبيعاً"
            subtitle="المنتجات الأكثر طلباً"
            products={MOCK_PRODUCTS.filter(p => p.isBestSeller || p.rating >= 4.7)}
            viewAllLink="/best-sellers"
            columns={4}
          />

          <Separator className="my-4" />

          {/* New Arrivals */}
          <ProductsSection
            title="أحدث المنتجات"
            subtitle="وصل حديثاً إلى متجرنا"
            products={MOCK_PRODUCTS.filter(p => p.isNewArrival)}
            viewAllLink="/new-arrivals"
            columns={4}
          />

          <Separator className="my-4" />

          {/* Single Banner */}
          <section className="py-6">
            <SingleBanner
              image="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=300&fit=crop"
              link="/deals"
              title="عروض حصرية تصل إلى 50% خصم"
            />
          </section>

          <Separator className="my-4" />

          {/* All Products */}
          <ProductsSection
            title="منتجات مقترحة لك"
            subtitle="اختياراتنا المميزة"
            products={MOCK_PRODUCTS}
            viewAllLink="/products"
            columns={5}
          />

          <Separator className="my-4" />

          {/* Featured Stores */}
          <FeaturedStoresSection />

          <Separator className="my-4" />

          {/* Customer Reviews */}
          <ReviewsSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />
      
      {/* Bottom Navigation (Mobile) */}
      <BottomNavSpacer />
      <BottomNav />
      
      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
}
