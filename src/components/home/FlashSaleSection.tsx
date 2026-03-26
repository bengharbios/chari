'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Timer, ChevronLeft, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FlashSaleProps {
  endTime: Date;
  products: FlashSaleProduct[];
}

interface FlashSaleProduct {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  originalPrice: number;
  salePrice: number;
  image: string;
  soldCount: number;
  totalQuantity: number;
}

export function FlashSaleSection({ endTime, products }: FlashSaleProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <section className="py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg">
            <Flame className="h-5 w-5 animate-pulse" />
            <span className="font-bold">عروض فلاش</span>
          </div>
          
          {/* Countdown Timer */}
          <div className="flex items-center gap-1 bg-muted px-3 py-2 rounded-lg">
            <Timer className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-1 font-mono text-sm">
              <TimeUnit value={timeLeft.hours} label="س" />
              <span className="text-muted-foreground">:</span>
              <TimeUnit value={timeLeft.minutes} label="د" />
              <span className="text-muted-foreground">:</span>
              <TimeUnit value={timeLeft.seconds} label="ث" />
            </div>
          </div>
        </div>

        <Link href="/flash-sale">
          <Button variant="ghost" className="gap-1 text-primary">
            <span>عرض الكل</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Products Scroll */}
      <div className="overflow-x-auto scrollbar-thin -mx-4 px-4">
        <div className="flex gap-4 pb-2" style={{ width: 'max-content' }}>
          {products.map((product) => (
            <FlashSaleCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlashSaleCard({ product }: { product: FlashSaleProduct }) {
  const discountPercentage = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );
  const soldPercentage = (product.soldCount / product.totalQuantity) * 100;

  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="w-[140px] sm:w-[180px] shrink-0 overflow-hidden hover:shadow-lg transition-shadow">
        {/* Image */}
        <div className="relative aspect-square bg-muted">
          <img
            src={product.image}
            alt={product.nameAr}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
            -{discountPercentage}%
          </Badge>
        </div>

        <CardContent className="p-2">
          {/* Name */}
          <h3 className="text-sm font-medium line-clamp-1 mb-2">
            {product.nameAr}
          </h3>

          {/* Price */}
          <div className="mb-2">
            <span className="font-bold text-primary">
              {product.salePrice.toLocaleString('ar-DZ')} دج
            </span>
            <div className="text-xs text-muted-foreground line-through">
              {product.originalPrice.toLocaleString('ar-DZ')} دج
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-1">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-l from-orange-500 to-red-500 rounded-full"
                style={{ width: `${soldPercentage}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground text-center">
              تم بيع {product.soldCount} من {product.totalQuantity}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center gap-0.5">
      <span className={cn(
        "bg-card px-1.5 py-0.5 rounded font-bold",
        value < 10 && "text-destructive"
      )}>
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  );
}

function calculateTimeLeft(endTime: Date) {
  const now = new Date();
  const difference = endTime.getTime() - now.getTime();

  if (difference <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    hours: Math.floor(difference / (1000 * 60 * 60)),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}
