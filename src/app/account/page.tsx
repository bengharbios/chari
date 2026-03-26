'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Settings, 
  Package,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronLeft,
  User
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { BottomNav, BottomNavSpacer } from '@/components/layout/BottomNav';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const MENU_ITEMS = [
  { icon: ShoppingBag, label: 'طلباتي', href: '/account/orders', description: 'تتبع طلباتك' },
  { icon: Heart, label: 'قائمة الأمنيات', href: '/account/wishlist', description: 'المنتجات المحفوظة' },
  { icon: MapPin, label: 'عناويني', href: '/account/addresses', description: 'إدارة عناوين التوصيل' },
  { icon: CreditCard, label: 'طرق الدفع', href: '/account/payments', description: 'إدارة بطاقاتك' },
  { icon: Settings, label: 'الإعدادات', href: '/account/settings', description: 'تخصيص حسابك' },
  { icon: HelpCircle, label: 'المساعدة', href: '/help', description: 'مركز الدعم' },
];

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me', {
      credentials: 'include', // Include cookies in the request
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setIsLoading(false);
      })
      .catch(() => {
        setUser(null);
        setIsLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  if (isLoading) {
    return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </main>
      <BottomNavSpacer />
      <BottomNav />
    </div>
  );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* User Card */}
          <Card>
            <CardContent className="p-6">
              {user ? (
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {user.name?.[0] || 'م'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">مرحباً، {user.name || 'المستخدم'}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={user.userType === 'ADMIN' ? 'default' : user.userType === 'SELLER' ? 'secondary' : user.userType === 'STORE' ? 'outline' : 'secondary'}>
                        {user.role?.nameAr || user.userType}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 ml-2" />
                    خروج
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-2xl bg-muted">
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">مرحباً بك</h2>
                    <p className="text-muted-foreground">قم بتسجيل الدخول للمتابعة</p>
                  </div>
                  <Button asChild>
                    <Link href="/auth/login">
                      تسجيل الدخول
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Package className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">0</p>
                <p className="text-xs text-muted-foreground">طلباتي</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">0</p>
                <p className="text-xs text-muted-foreground">الأمنيات</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MapPin className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">0</p>
                <p className="text-xs text-muted-foreground">العناوين</p>
              </CardContent>
            </Card>
          </div>

          {/* Menu Items */}
          <Card>
            <CardContent className="p-0">
              {MENU_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.href}>
                {index > 0 && <Separator />}
                <Link
                  href={item.href}
                  className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-muted-foreground" />
                </Link>
              </div>
            );
          })}
            </CardContent>
          </Card>

          {/* Logout */}
          {user && (
            <Button variant="outline" className="w-full gap-2 text-destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              تسجيل الخروج
            </Button>
          )}
        </div>
      </main>

      <BottomNavSpacer />
      <BottomNav />
    </div>
  );
}
