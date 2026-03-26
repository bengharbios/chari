'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid3X3, Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', icon: Home, label: 'الرئيسية' },
  { href: '/categories', icon: Grid3X3, label: 'الفئات' },
  { href: '/search', icon: Search, label: 'بحث' },
  { href: '/cart', icon: ShoppingBag, label: 'السلة', showBadge: true },
  { href: '/account', icon: User, label: 'حسابي' },
];

export function BottomNav() {
  const pathname = usePathname();
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background border-t pb-safe">
      <div className="flex items-center justify-around h-16">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full relative",
                "transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <Icon className="h-6 w-6" />
                {item.showBadge && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold bg-primary text-primary-foreground rounded-full">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              
              {/* Active Indicator */}
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// Spacer component to add space at bottom for mobile
export function BottomNavSpacer() {
  return <div className="h-16 lg:hidden shrink-0" />;
}
