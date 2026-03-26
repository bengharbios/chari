'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Heart,
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  Package,
  Store
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/providers/AuthProvider';
import { NAV_LINKS } from '@/lib/constants';
import { CategoriesMenu } from './CategoriesMenu';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();
  const { getTotalItems, toggleCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const cartCount = getTotalItems();

  // Get user display name
  const getUserDisplayName = () => {
    if (user?.nameAr) return user.nameAr;
    if (user?.name) return user.name;
    return 'المستخدم';
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    const name = user?.nameAr || user?.name || 'U';
    return name.charAt(0).toUpperCase();
  };

  // Get dashboard link based on user type
  const getDashboardLink = () => {
    if (!user) return '/auth/login';
    switch (user.userType) {
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return '/admin/dashboard';
      case 'SELLER':
        return '/seller';
      case 'STORE':
        return '/store';
      default:
        return '/account';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar - الشريط العلوي */}
      <div className="hidden md:flex items-center justify-center bg-primary text-primary-foreground text-sm py-1">
        <p>🚚 توصيل مجاني للطلبات فوق 5000 دج | خصم 10% على أول طلب 🎉</p>
      </div>

      {/* Main Header - الهيدر الرئيسي */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-brand-600">ChariDay</h1>
              <p className="text-[10px] text-muted-foreground -mt-1">شاري داي</p>
            </div>
          </Link>

          {/* Search Bar - شريط البحث (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="ابحث عن منتج، علامة تجارية، أو متجر..."
                className="w-full h-11 pr-10 pl-4 rounded-full bg-muted border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                size="icon" 
                className="absolute left-1 top-1 h-9 w-9 rounded-full bg-primary hover:bg-primary/90"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions - الإجراءات */}
          <div className="flex items-center gap-1">
            {/* Search Button (Mobile) */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hidden sm:flex"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="hidden sm:flex relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                3
              </Badge>
            </Button>

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={toggleCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-primary">
                  {cartCount > 99 ? '99+' : cartCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  {isAuthenticated && user?.avatar ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={getUserDisplayName()} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" dir="rtl">
                {isAuthenticated ? (
                  <>
                    <div className="p-2 text-right">
                      <p className="font-medium">مرحباً، {getUserDisplayName()}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    {/* Dashboard link for non-buyers */}
                    {user?.userType !== 'BUYER' && (
                      <DropdownMenuItem asChild>
                        <Link href={getDashboardLink()} className="flex items-center gap-2" dir="rtl">
                          {user?.userType === 'SELLER' ? (
                            <User className="h-4 w-4" />
                          ) : user?.userType === 'STORE' ? (
                            <Store className="h-4 w-4" />
                          ) : (
                            <Settings className="h-4 w-4" />
                          )}
                          <span>لوحة التحكم</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="flex items-center gap-2" dir="rtl">
                        <User className="h-4 w-4" />
                        <span>حسابي</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center gap-2" dir="rtl">
                        <Package className="h-4 w-4" />
                        <span>طلباتي</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => logout()}
                      className="text-red-600 focus:text-red-600 flex items-center gap-2"
                      dir="rtl"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>تسجيل الخروج</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <div className="p-2 text-right">
                      <p className="font-medium">مرحباً بك</p>
                      <p className="text-sm text-muted-foreground">سجل الدخول للمتابعة</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/auth/login" className="text-right">تسجيل الدخول</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/register" className="text-right">إنشاء حساب</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="text-right">طلباتي</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist" className="text-right">قائمة الأمنيات</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/addresses" className="text-right">عناويني</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <MobileMenu />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Categories Navigation - التنقل بالفئات (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 py-2 border-t">
          <CategoriesMenu />
          
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Search Sheet */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="flex items-center gap-2 p-4 border-b">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            <Input
              type="search"
              placeholder="ابحث عن منتج..."
              className="flex-1 h-11"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Search Results will be here */}
          <div className="p-4">
            <p className="text-muted-foreground text-center py-8">
              اكتب للبحث عن المنتجات
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

// Mobile Menu Component
function MobileMenu() {
  const { user, isAuthenticated, logout } = useAuth();

  // Get user display name
  const getUserDisplayName = () => {
    if (user?.nameAr) return user.nameAr;
    if (user?.name) return user.name;
    return 'المستخدم';
  };

  // Get dashboard link based on user type
  const getDashboardLink = () => {
    if (!user) return '/auth/login';
    switch (user.userType) {
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return '/admin/dashboard';
      case 'SELLER':
        return '/seller';
      case 'STORE':
        return '/store';
      default:
        return '/account';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          {isAuthenticated && user?.avatar ? (
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} alt={getUserDisplayName()} />
              <AvatarFallback className="bg-gradient-to-br from-brand-500 to-brand-600 text-white text-lg">
                {(user?.nameAr || user?.name || 'U').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
          )}
          <div>
            {isAuthenticated ? (
              <>
                <h2 className="font-bold text-lg">{getUserDisplayName()}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </>
            ) : (
              <>
                <h2 className="font-bold text-lg">ChariDay</h2>
                <p className="text-sm text-muted-foreground">شاري داي</p>
              </>
            )}
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {isAuthenticated ? (
          <>
            {user?.userType !== 'BUYER' && (
              <Link href={getDashboardLink()} className="block">
                <Button className="w-full" variant="default">
                  لوحة التحكم
                </Button>
              </Link>
            )}
            <Link href="/account" className="block">
              <Button className="w-full" variant="outline">
                حسابي
              </Button>
            </Link>
            <Button 
              className="w-full text-red-600" 
              variant="ghost"
              onClick={() => logout()}
            >
              تسجيل الخروج
            </Button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="block">
              <Button className="w-full" variant="default">
                تسجيل الدخول
              </Button>
            </Link>
            <Link href="/auth/register" className="block">
              <Button className="w-full" variant="outline">
                إنشاء حساب
              </Button>
            </Link>
          </>
        )}
        
        <div className="border-t my-4" />
        
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors"
          >
            {link.label}
          </Link>
        ))}
        
        <Link href="/orders" className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors">
          طلباتي
        </Link>
        <Link href="/wishlist" className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors">
          قائمة الأمنيات
        </Link>
        <Link href="/addresses" className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors">
          عناويني
        </Link>
      </nav>
      
      <div className="p-4 border-t">
        <p className="text-xs text-muted-foreground text-center">
          © 2024 ChariDay. جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  );
}
