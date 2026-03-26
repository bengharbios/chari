'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  FolderTree,
  Store,
  CreditCard,
  Tag,
  Settings,
  LayoutGrid,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useAuth } from '@/providers/AuthProvider';

const NAV_ITEMS = [
  {
    title: 'لوحة التحكم',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'المستخدمين',
    href: '/admin/users',
    icon: Users,
    badge: 12,
  },
  {
    title: 'المنتجات',
    href: '/admin/products',
    icon: Package,
  },
  {
    title: 'الطلبات',
    href: '/admin/orders',
    icon: ShoppingCart,
    badge: 5,
  },
  {
    title: 'الفئات',
    href: '/admin/categories',
    icon: FolderTree,
  },
  {
    title: 'المتاجر',
    href: '/admin/stores',
    icon: Store,
  },
  {
    title: 'الاشتراكات',
    href: '/admin/subscriptions',
    icon: CreditCard,
  },
  {
    title: 'الكوبونات',
    href: '/admin/coupons',
    icon: Tag,
  },
  {
    title: 'الصفحة الرئيسية',
    href: '/admin/homepage',
    icon: LayoutGrid,
  },
  {
    title: 'الإعدادات',
    href: '/admin/settings',
    icon: Settings,
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Auth protection
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    } else if (!isLoading && isAuthenticated && user) {
      // Check if user has admin role (ADMIN or SUPER_ADMIN)
      const isAdmin = user.userType === 'ADMIN' && 
        (user.role?.name === 'ADMIN' || user.role?.name === 'SUPER_ADMIN');
      
      if (!isAdmin) {
        router.push('/');
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  // Check admin authorization
  const isAdmin = user?.userType === 'ADMIN' && 
    (user?.role?.name === 'ADMIN' || user?.role?.name === 'SUPER_ADMIN');

  // Show loading while checking auth
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">ليس لديك صلاحية للوصول إلى هذه الصفحة</p>
        </div>
      </div>
    );
  }

  // Get user display name
  const getUserDisplayName = () => {
    if (user?.nameAr) return user.nameAr;
    if (user?.name) return user.name;
    return 'المدير';
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-background border-l transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {!isCollapsed && (
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="font-bold text-lg">ChariDay</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors relative",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  dir="rtl"
                >
                  {!isCollapsed && (
                    <>
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge className="h-5 min-w-5 px-1.5">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                  {isCollapsed && (
                    <Icon className="h-5 w-5 mx-auto" />
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* User Menu */}
        {!isCollapsed && (
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{getUserDisplayName().charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{getUserDisplayName()}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-64 bg-background shadow-xl">
            <div className="h-16 flex items-center justify-between px-4 border-b">
              <Link href="/admin" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
                <span className="font-bold text-lg">ChariDay</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(false)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1 py-4">
              <nav className="space-y-1 px-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                      dir="rtl"
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge className="h-5 min-w-5 px-1.5">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </ScrollArea>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-background border-b flex items-center justify-between px-4 gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث..."
                className="pr-9"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80" dir="rtl">
                <DropdownMenuLabel className="text-right">الإشعارات</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem dir="rtl">
                  <div className="flex flex-col gap-1 text-right">
                    <span className="font-medium">طلب جديد</span>
                    <span className="text-xs text-muted-foreground">
                      تم استلام طلب جديد #12345
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem dir="rtl">
                  <div className="flex flex-col gap-1 text-right">
                    <span className="font-medium">متجر جديد</span>
                    <span className="text-xs text-muted-foreground">
                      متجر "التقنية" يطلب التوثيق
                    </span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{getUserDisplayName().charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">{getUserDisplayName()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" dir="rtl">
                <DropdownMenuLabel className="text-right">حسابي</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2" dir="rtl">
                  <Settings className="h-4 w-4" />
                  <span>الإعدادات</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive flex items-center gap-2" onClick={handleLogout} dir="rtl">
                  <LogOut className="h-4 w-4" />
                  <span>تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
