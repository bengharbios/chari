'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard, ProductCardSkeleton } from '@/components/products/ProductCard';

interface Product {
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
}

interface ProductsSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  isLoading?: boolean;
  columns?: 2 | 3 | 4 | 5 | 6;
}

export function ProductsSection({
  title,
  subtitle,
  products,
  viewAllLink,
  isLoading = false,
  columns = 4,
}: ProductsSectionProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
  };

  return (
    <section className="py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {viewAllLink && (
          <Link href={viewAllLink}>
            <Button variant="ghost" className="gap-1 text-primary">
              <span>عرض الكل</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      {/* Products Grid */}
      <div className={`grid ${gridCols[columns]} gap-3 md:gap-4`}>
        {isLoading
          ? Array.from({ length: columns * 2 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </section>
  );
}

// Horizontal Scrollable Products Section
export function ProductsScrollSection({
  title,
  subtitle,
  products,
  viewAllLink,
  isLoading = false,
}: Omit<ProductsSectionProps, 'columns'>) {
  return (
    <section className="py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {viewAllLink && (
          <Link href={viewAllLink}>
            <Button variant="ghost" className="gap-1 text-primary">
              <span>عرض الكل</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      {/* Products Scroll */}
      <div className="overflow-x-auto scrollbar-thin -mx-4 px-4">
        <div className="flex gap-4 pb-2" style={{ width: 'max-content' }}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-[160px] sm:w-[200px] shrink-0">
                  <ProductCardSkeleton />
                </div>
              ))
            : products.map((product) => (
                <div key={product.id} className="w-[160px] sm:w-[200px] shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
