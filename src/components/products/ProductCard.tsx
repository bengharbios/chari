'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star, BadgePercent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    nameAr: string;
    slug: string;
    basePrice: number;
    salePrice?: number;
    images: { url: string; alt?: string }[];
    rating: number;
    totalReviews: number;
    quantity: number;
    isFeatured?: boolean;
    isNewArrival?: boolean;
    isBestSeller?: boolean;
    store?: {
      storeName: string;
      storeNameAr?: string;
    };
  };
  showStore?: boolean;
}

export function ProductCard({ product, showStore = true }: ProductCardProps) {
  const { addItem } = useCart();
  
  const hasDiscount = product.salePrice && product.salePrice < product.basePrice;
  const discountPercentage = hasDiscount
    ? Math.round(((product.basePrice - product.salePrice!) / product.basePrice) * 100)
    : 0;
  
  const isOutOfStock = product.quantity === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      productId: product.id,
      name: product.name,
      nameAr: product.nameAr,
      image: product.images[0]?.url || '',
      price: product.basePrice,
      salePrice: product.salePrice,
      quantity: 1,
      maxQuantity: product.quantity,
    });
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="group relative overflow-hidden h-full hover:shadow-lg transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.images[0]?.url || '/placeholder-product.png'}
            alt={product.images[0]?.alt || product.nameAr}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {hasDiscount && (
              <Badge className="bg-destructive text-destructive-foreground">
                <BadgePercent className="h-3 w-3 ml-1" />
                {discountPercentage}%
              </Badge>
            )}
            {product.isNewArrival && (
              <Badge className="bg-success text-success-foreground">جديد</Badge>
            )}
            {product.isBestSeller && (
              <Badge className="bg-warning text-warning-foreground">الأكثر مبيعاً</Badge>
            )}
          </div>
          
          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary" className="text-lg">
                نفذت الكمية
              </Badge>
            </div>
          )}
          
          {/* Quick Actions */}
          <div className="absolute bottom-2 left-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              <ShoppingCart className="h-4 w-4 ml-1" />
              أضف للسلة
            </Button>
            <Button size="sm" variant="secondary">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-3">
          {/* Store Name */}
          {showStore && product.store && (
            <p className="text-xs text-muted-foreground mb-1">
              {product.store.storeNameAr || product.store.storeName}
            </p>
          )}
          
          {/* Product Name */}
          <h3 className="font-medium text-sm line-clamp-2 mb-2 min-h-[40px]">
            {product.nameAr}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.totalReviews})
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg text-primary">
              {(product.salePrice || product.basePrice).toLocaleString('ar-DZ')} دج
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {product.basePrice.toLocaleString('ar-DZ')} دج
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full">
      <div className="aspect-square bg-muted animate-pulse" />
      <CardContent className="p-3 space-y-2">
        <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        <div className="h-3 w-1/4 bg-muted rounded animate-pulse" />
        <div className="h-5 w-1/3 bg-muted rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}
