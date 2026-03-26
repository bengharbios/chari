'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Settings,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/providers/AuthProvider';

export default function SellerDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    } else if (!isLoading && isAuthenticated && user?.userType !== 'SELLER') {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || !isAuthenticated || (user && user.userType !== 'SELLER')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-bold hidden sm:block">لوحة التاجر</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">مرحباً، {user?.nameAr || user?.name || 'التاجر'}</h1>
          <p className="text-muted-foreground">إدارة متجرك ومنتجاتك</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Package className="h-4 w-4" />
                <span className="text-sm">المنتجات</span>
              </div>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <ShoppingCart className="h-4 w-4" />
                <span className="text-sm">الطلبات</span>
              </div>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">المبيعات</span>
              </div>
              <p className="text-2xl font-bold">0 دج</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">التقييم</span>
              </div>
              <p className="text-2xl font-bold">-</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Plus className="h-5 w-5" />
              <span className="text-xs">إضافة منتج</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-xs">الطلبات</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Package className="h-5 w-5" />
              <span className="text-xs">المنتجات</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Settings className="h-5 w-5" />
              <span className="text-xs">الإعدادات</span>
            </Button>
          </CardContent>
        </Card>

        {/* Upgrade Notice */}
        <Card className="bg-gradient-to-r from-brand-500 to-brand-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg mb-1">ترقية إلى متجر موثق</h3>
                <p className="text-white/80 text-sm">احصل على مميزات أكثر وظهور أفضل للمنتجات</p>
              </div>
              <Button variant="secondary">
                طلب الترقية
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
