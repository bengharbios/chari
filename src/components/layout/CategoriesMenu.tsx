'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

// فئات وهمية للعرض - سيتم استبدالها بالبيانات الحقيقية
const CATEGORIES = [
  {
    id: 'electronics',
    name: 'الإلكترونيات',
    icon: '📱',
    subcategories: [
      { id: 'phones', name: 'الهواتف الذكية' },
      { id: 'tablets', name: 'الأجهزة اللوحية' },
      { id: 'laptops', name: 'الحواسيب المحمولة' },
      { id: 'accessories', name: 'الإكسسوارات' },
      { id: 'cameras', name: 'الكاميرات' },
    ],
  },
  {
    id: 'fashion',
    name: 'الموضة',
    icon: '👕',
    subcategories: [
      { id: 'men', name: 'ملابس رجالية' },
      { id: 'women', name: 'ملابس نسائية' },
      { id: 'kids', name: 'ملابس أطفال' },
      { id: 'shoes', name: 'الأحذية' },
      { id: 'accessories', name: 'الإكسسوارات' },
    ],
  },
  {
    id: 'home',
    name: 'المنزل والمطبخ',
    icon: '🏠',
    subcategories: [
      { id: 'furniture', name: 'الأثاث' },
      { id: 'kitchen', name: 'المطبخ' },
      { id: 'decor', name: 'الديكور' },
      { id: 'bedding', name: 'الفراش' },
      { id: 'bathroom', name: 'الحمام' },
    ],
  },
  {
    id: 'beauty',
    name: 'الجمال والعناية',
    icon: '💄',
    subcategories: [
      { id: 'skincare', name: 'العناية بالبشرة' },
      { id: 'makeup', name: 'المكياج' },
      { id: 'haircare', name: 'العناية بالشعر' },
      { id: 'perfumes', name: 'العطور' },
    ],
  },
  {
    id: 'sports',
    name: 'الرياضة',
    icon: '⚽',
    subcategories: [
      { id: 'fitness', name: 'اللياقة البدنية' },
      { id: 'outdoor', name: 'الأنشطة الخارجية' },
      { id: 'team-sports', name: 'الرياضات الجماعية' },
      { id: 'swimming', name: 'السباحة' },
    ],
  },
  {
    id: 'baby',
    name: 'الأم والطفل',
    icon: '👶',
    subcategories: [
      { id: 'diapers', name: 'الحفاضات' },
      { id: 'feeding', name: 'التغذية' },
      { id: 'toys', name: 'الألعاب' },
      { id: 'strollers', name: 'عربات الأطفال' },
    ],
  },
];

export function CategoriesMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1">
            <span>☰</span>
            <span>جميع الفئات</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 gap-0 w-[500px] max-h-[400px] overflow-y-auto">
              {CATEGORIES.map((category) => (
                <div key={category.id} className="border-l border-b last:border-l-0">
                  <Link
                    href={`/categories/${category.id}`}
                    className="flex items-center gap-2 p-3 hover:bg-muted transition-colors"
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </Link>
                  <div className="py-1 px-3 pb-3">
                    {category.subcategories.slice(0, 4).map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/categories/${category.id}/${sub.id}`}
                        className="block py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                    {category.subcategories.length > 4 && (
                      <Link
                        href={`/categories/${category.id}`}
                        className="flex items-center gap-1 py-1 text-sm text-primary hover:underline"
                      >
                        <span>عرض الكل</span>
                        <ChevronLeft className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// Mobile Categories List
export function MobileCategoriesList() {
  return (
    <div className="space-y-2">
      {CATEGORIES.map((category) => (
        <div key={category.id} className="border rounded-lg overflow-hidden">
          <Link
            href={`/categories/${category.id}`}
            className="flex items-center justify-between p-4 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </div>
            <ChevronLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      ))}
    </div>
  );
}

// Categories Grid for Home Page
export function CategoriesGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {CATEGORIES.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.id}`}
          className="flex flex-col items-center p-4 rounded-xl bg-card hover:shadow-lg transition-all hover:-translate-y-1"
        >
          <span className="text-4xl mb-2">{category.icon}</span>
          <span className="text-sm font-medium text-center">{category.name}</span>
        </Link>
      ))}
    </div>
  );
}
