'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/layout/Header';
import { BottomNav, BottomNavSpacer } from '@/components/layout/BottomNav';
import { ProductsSection } from '@/components/home/ProductsSection';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

// بيانات المنتج الوهمية
const PRODUCT = {
  id: '1',
  name: 'iPhone 15 Pro Max',
  nameAr: 'آيفون 15 برو ماكس',
  slug: 'iphone-15-pro-max',
  description: 'أحدث هواتف آيفون مع شاشة OLED بحجم 6.7 بوصة ومعالج A17 Pro القوي.',
  descriptionAr: `أحدث جيل من هواتف آيفون الذكية من آبل. يتميز بتصميم تيتانيوم فاخر وشاشة Super Retina XDR بحجم 6.7 بوصة.

المميزات الرئيسية:
• معالج A17 Pro الجديد بالكامل
• نظام كاميرا متطور 48 ميجابكسل
• تصوير فيديو 4K Cinematic
• بطارية تدوم طوال اليوم
• مقاومة للماء والغبار IP68
• دعم شحن سريع MagSafe`,
  basePrice: 189900,
  salePrice: 169900,
  images: [
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&sat=-100',
    'https://images.unsplash.com/photo-1591337676887-a217a6970a3a?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop',
  ],
  rating: 4.8,
  totalReviews: 256,
  quantity: 50,
  store: {
    name: 'Apple Store',
    nameAr: 'متجر آبل',
    rating: 4.9,
    isVerified: true,
  },
  variants: {
    colors: [
      { id: 'black', name: 'أسود تيتانيوم', hex: '#1C1C1E' },
      { id: 'white', name: 'أبيض تيتانيوم', hex: '#F5F5F7' },
      { id: 'blue', name: 'أزرق تيتانيوم', hex: '#394867' },
      { id: 'natural', name: 'تيتانيوم طبيعي', hex: '#A3A49E' },
    ],
    storage: [
      { id: '256', name: '256GB', price: 0 },
      { id: '512', name: '512GB', price: 20000 },
      { id: '1tb', name: '1TB', price: 50000 },
    ],
  },
  specifications: [
    { name: 'الشاشة', value: '6.7 بوصة Super Retina XDR' },
    { name: 'المعالج', value: 'A17 Pro' },
    { name: 'الكاميرا', value: '48MP + 12MP + 12MP' },
    { name: 'البطارية', value: '4422 mAh' },
    { name: 'نظام التشغيل', value: 'iOS 17' },
  ],
};

const RELATED_PRODUCTS = [
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
    store: { storeName: 'Apple Store', storeNameAr: 'متجر آبل' },
  },
];

export default function ProductPage() {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(PRODUCT.variants.colors[0].id);
  const [selectedStorage, setSelectedStorage] = useState(PRODUCT.variants.storage[0].id);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountPercentage = Math.round(
    ((PRODUCT.basePrice - PRODUCT.salePrice) / PRODUCT.basePrice) * 100
  );

  const selectedStorageData = PRODUCT.variants.storage.find(s => s.id === selectedStorage);
  const finalPrice = PRODUCT.salePrice + (selectedStorageData?.price || 0);

  const handleAddToCart = () => {
    addItem({
      productId: PRODUCT.id,
      name: PRODUCT.name,
      nameAr: PRODUCT.nameAr,
      image: PRODUCT.images[0],
      price: PRODUCT.basePrice + (selectedStorageData?.price || 0),
      salePrice: finalPrice,
      quantity,
      maxQuantity: PRODUCT.quantity,
      attributes: {
        اللون: PRODUCT.variants.colors.find(c => c.id === selectedColor)?.name || '',
        التخزين: selectedStorageData?.name || '',
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={PRODUCT.images[selectedImage]}
                  alt={PRODUCT.nameAr}
                  fill
                  className="object-cover"
                />
                {discountPercentage > 0 && (
                  <Badge className="absolute top-4 right-4 bg-destructive">
                    خصم {discountPercentage}%
                  </Badge>
                )}
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {PRODUCT.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-colors",
                      selectedImage === index ? "border-primary" : "border-transparent"
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${PRODUCT.nameAr} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Store & Title */}
              <div>
                <Link 
                  href={`/store/${PRODUCT.store.name}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {PRODUCT.store.nameAr}
                  {PRODUCT.store.isVerified && (
                    <Badge variant="secondary" className="mr-2">موثق</Badge>
                  )}
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold mt-1">{PRODUCT.nameAr}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(PRODUCT.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      )}
                    />
                  ))}
                </div>
                <span className="font-medium">{PRODUCT.rating}</span>
                <span className="text-muted-foreground">({PRODUCT.totalReviews} تقييم)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                  {finalPrice.toLocaleString('ar-DZ')} دج
                </span>
                {PRODUCT.salePrice < PRODUCT.basePrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {PRODUCT.basePrice.toLocaleString('ar-DZ')} دج
                  </span>
                )}
              </div>

              <Separator />

              {/* Variants */}
              <div className="space-y-6">
                {/* Color */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">اللون</Label>
                  <div className="flex gap-3">
                    {PRODUCT.variants.colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={cn(
                          "relative w-12 h-12 rounded-full border-2 transition-all",
                          selectedColor === color.id 
                            ? "border-primary ring-2 ring-primary/20" 
                            : "border-muted hover:border-gray-300"
                        )}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor === color.id && (
                          <Check className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow-md" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">سعة التخزين</Label>
                  <div className="flex gap-3">
                    {PRODUCT.variants.storage.map((storage) => (
                      <button
                        key={storage.id}
                        onClick={() => setSelectedStorage(storage.id)}
                        className={cn(
                          "px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium",
                          selectedStorage === storage.id
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-muted hover:border-gray-300"
                        )}
                      >
                        {storage.name}
                        {storage.price > 0 && (
                          <span className="text-muted-foreground mr-1">
                            +{storage.price.toLocaleString('ar-DZ')} دج
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(Math.min(PRODUCT.quantity, quantity + 1))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button className="flex-1" size="lg" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5 ml-2" />
                  أضف للسلة
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={cn(
                    "h-5 w-5",
                    isWishlisted && "fill-destructive text-destructive"
                  )} />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center p-3 bg-muted rounded-lg">
                  <Truck className="h-5 w-5 text-muted-foreground mb-2" />
                  <span className="text-xs">توصيل سريع</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-muted rounded-lg">
                  <Shield className="h-5 w-5 text-muted-foreground mb-2" />
                  <span className="text-xs">ضمان سنة</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-muted rounded-lg">
                  <RotateCcw className="h-5 w-5 text-muted-foreground mb-2" />
                  <span className="text-xs">إرجاع 14 يوم</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="mt-12">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">الوصف</TabsTrigger>
              <TabsTrigger value="specifications">المواصفات</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات ({PRODUCT.totalReviews})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6 prose prose-sm max-w-none">
                  <p className="whitespace-pre-line">{PRODUCT.descriptionAr}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <table className="w-full">
                    <tbody>
                      {PRODUCT.specifications.map((spec, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-muted/50' : ''}>
                          <td className="py-3 px-4 font-medium w-1/3">{spec.name}</td>
                          <td className="py-3 px-4">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  لا توجد تقييمات بعد. كن أول من يقيّم هذا المنتج!
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          <div className="mt-12">
            <ProductsSection
              title="منتجات مشابهة"
              products={RELATED_PRODUCTS}
              viewAllLink="/category/electronics"
              columns={4}
            />
          </div>
        </div>
      </main>

      <BottomNavSpacer />
      <BottomNav />
      
      {/* Mobile Fixed Bottom Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-background border-t p-4 lg:hidden z-40">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">السعر</p>
            <p className="text-lg font-bold text-primary">
              {finalPrice.toLocaleString('ar-DZ')} دج
            </p>
          </div>
          <Button className="flex-1" size="lg" onClick={handleAddToCart}>
            <ShoppingCart className="h-5 w-5 ml-2" />
            أضف للسلة
          </Button>
        </div>
      </div>
    </div>
  );
}
