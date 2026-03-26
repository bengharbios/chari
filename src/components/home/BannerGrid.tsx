'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Banner {
  id: string;
  title: string;
  titleAr?: string;
  image: string;
  link: string;
}

interface BannerGridProps {
  banners: Banner[];
  layout?: '2x1' | '1x2' | '3x1';
}

export function BannerGrid({ banners, layout = '2x1' }: BannerGridProps) {
  if (layout === '2x1' && banners.length >= 2) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banners.slice(0, 2).map((banner) => (
          <BannerCard key={banner.id} banner={banner} />
        ))}
      </div>
    );
  }

  if (layout === '1x2' && banners.length >= 2) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:row-span-2">
          <BannerCard banner={banners[0]} className="h-full" />
        </div>
        <div className="space-y-4">
          <BannerCard banner={banners[1]} />
          {banners[2] && <BannerCard banner={banners[2]} />}
        </div>
      </div>
    );
  }

  if (layout === '3x1' && banners.length >= 3) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {banners.slice(0, 3).map((banner) => (
          <BannerCard key={banner.id} banner={banner} />
        ))}
      </div>
    );
  }

  return null;
}

function BannerCard({ banner, className = '' }: { banner: Banner; className?: string }) {
  return (
    <Link
      href={banner.link}
      className={`relative block overflow-hidden rounded-xl bg-muted group ${className}`}
    >
      <div className="aspect-[2/1] md:aspect-[3/1] relative">
        <Image
          src={banner.image}
          alt={banner.titleAr || banner.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {banner.titleAr && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <h3 className="text-white font-bold text-lg">{banner.titleAr}</h3>
          </div>
        )}
      </div>
    </Link>
  );
}

// Single Banner
export function SingleBanner({ 
  image, 
  link, 
  title 
}: { 
  image: string; 
  link: string; 
  title?: string;
}) {
  return (
    <Link
      href={link}
      className="relative block overflow-hidden rounded-xl bg-muted group"
    >
      <div className="aspect-[3/1] md:aspect-[4/1] relative">
        <Image
          src={image}
          alt={title || 'Banner'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {title && (
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent flex items-center justify-start p-8">
            <h3 className="text-white font-bold text-xl md:text-2xl">{title}</h3>
          </div>
        )}
      </div>
    </Link>
  );
}
