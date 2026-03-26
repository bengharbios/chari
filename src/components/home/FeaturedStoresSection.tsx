'use client';

import Link from 'next/link';
import { ChevronLeft, Store, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// بيانات المتاجر الوهمية
const FEATURED_STORES = [
  {
    id: '1',
    storeName: 'متجر التقنية',
    storeNameAr: 'متجر التقنية',
    slug: 'tech-store',
    logo: 'https://ui-avatars.com/api/?name=Tech&background=f97316&color=fff',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
    description: 'أحدث الأجهزة الإلكترونية والهواتف',
    rating: 4.8,
    totalReviews: 1250,
    followersCount: 5420,
    productsCount: 350,
    isVerified: true,
  },
  {
    id: '2',
    storeName: 'بيت الأناقة',
    storeNameAr: 'بيت الأناقة',
    slug: 'fashion-house',
    logo: 'https://ui-avatars.com/api/?name=Fashion&background=ec4899&color=fff',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop',
    description: 'أحدث صيحات الموضة والأزياء',
    rating: 4.6,
    totalReviews: 890,
    followersCount: 3200,
    productsCount: 520,
    isVerified: true,
  },
  {
    id: '3',
    storeName: 'عالم الأطفال',
    storeNameAr: 'عالم الأطفال',
    slug: 'kids-world',
    logo: 'https://ui-avatars.com/api/?name=Kids&background=22c55e&color=fff',
    coverImage: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=400&h=200&fit=crop',
    description: 'كل ما يحتاجه طفلك',
    rating: 4.9,
    totalReviews: 2100,
    followersCount: 8900,
    productsCount: 780,
    isVerified: true,
  },
  {
    id: '4',
    storeName: 'ديكور المنزل',
    storeNameAr: 'ديكور المنزل',
    slug: 'home-decor',
    logo: 'https://ui-avatars.com/api/?name=Home&background=8b5cf6&color=fff',
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=200&fit=crop',
    description: 'أفخم قطع الديكور والأثاث',
    rating: 4.7,
    totalReviews: 650,
    followersCount: 2100,
    productsCount: 280,
    isVerified: false,
  },
];

export function FeaturedStoresSection() {
  return (
    <section className="py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Store className="h-5 w-5 text-primary" />
          <h2 className="text-xl md:text-2xl font-bold">متاجر مميزة</h2>
        </div>
        <Link href="/stores">
          <Button variant="ghost" className="gap-1 text-primary">
            <span>عرض الكل</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {FEATURED_STORES.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </section>
  );
}

function StoreCard({ store }: { store: typeof FEATURED_STORES[0] }) {
  return (
    <Link href={`/store/${store.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
        {/* Cover Image */}
        <div className="relative h-24 bg-muted">
          <img
            src={store.coverImage}
            alt={store.storeNameAr}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Logo */}
          <div className="absolute -bottom-6 right-3">
            <Avatar className="w-12 h-12 border-4 border-background">
              <AvatarImage src={store.logo} alt={store.storeNameAr} />
              <AvatarFallback>{store.storeName[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <CardContent className="pt-8 pb-4 px-4">
          {/* Store Name */}
          <div className="flex items-center gap-1 mb-1">
            <h3 className="font-medium text-sm line-clamp-1">{store.storeNameAr}</h3>
            {store.isVerified && (
              <Badge variant="secondary" className="h-4 px-1 text-[10px]">
                موثق
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
            {store.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{store.rating}</span>
            </div>
            <span>{store.productsCount} منتج</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
