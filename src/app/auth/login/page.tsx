'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Phone, Mail, ArrowLeft, User, Store, ShoppingBag, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Demo accounts
const DEMO_ACCOUNTS = [
  {
    email: 'admin@chariday.dz',
    password: 'demo123456',
    type: 'admin',
    name: 'مدير النظام',
    icon: Shield,
    color: 'bg-red-500',
    description: 'لوحة تحكم كاملة للمسؤولين',
  },
  {
    email: 'superadmin@chariday.dz',
    password: 'demo123456',
    type: 'superadmin',
    name: 'المشرف العام',
    icon: Shield,
    color: 'bg-purple-500',
    description: 'صلاحيات كاملة على النظام',
  },
  {
    email: 'seller@chariday.dz',
    password: 'demo123456',
    type: 'seller',
    name: 'تاجر مستقل',
    icon: User,
    color: 'bg-blue-500',
    description: 'إضافة منتجات وتتبع الطلبات',
  },
  {
    email: 'store@chariday.dz',
    password: 'demo123456',
    type: 'store',
    name: 'متجر التقنية',
    icon: Store,
    color: 'bg-green-500',
    description: 'متجر موثق مع مميزات متقدمة',
  },
  {
    email: 'buyer@chariday.dz',
    password: 'demo123456',
    type: 'buyer',
    name: 'محمد المشتري',
    icon: ShoppingBag,
    color: 'bg-orange-500',
    description: 'تسوق وإدارة المشتريات',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSeeded, setIsSeeded] = useState(false);
  
  // Login with Email
  const [emailData, setEmailData] = useState({ email: '', password: '' });
  
  // Login with Phone
  const [phoneData, setPhoneData] = useState({ phone: '' });

  // Check if demo accounts exist
  useEffect(() => {
    fetch('/api/seed')
      .then(res => res.json())
      .then(data => {
        if (data.accounts && data.accounts.length > 0) {
          setIsSeeded(true);
        }
      })
      .catch(() => {});
  }, []);

  // Seed demo accounts
  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    try {
      const res = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create-all' }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast({
          title: 'تم إنشاء الحسابات',
          description: 'يمكنك الآن استخدام الحسابات التجريبية',
        });
        setIsSeeded(true);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'خطأ',
        description: 'فشل إنشاء الحسابات التجريبية',
      });
    } finally {
      setIsSeeding(false);
    }
  };

  // Demo login
  const handleDemoLogin = async (account: typeof DEMO_ACCOUNTS[0]) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: account.email,
          password: account.password,
        }),
      });

      if (!res.ok) {
        throw new Error('فشل تسجيل الدخول');
      }

      toast({
        title: 'تم تسجيل الدخول',
        description: `مرحباً ${account.name}`,
      });

      // Redirect based on user type
      if (account.type === 'admin' || account.type === 'superadmin') {
        router.push('/admin/dashboard');
      } else if (account.type === 'seller') {
        router.push('/seller');
      } else if (account.type === 'store') {
        router.push('/store');
      } else {
        router.push('/');
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'فشل تسجيل الدخول',
        description: 'حاول مرة أخرى',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
      });

      if (!res.ok) {
        throw new Error('فشل تسجيل الدخول');
      }

      toast({
        title: 'تم تسجيل الدخول بنجاح',
        description: 'مرحباً بك في ChariDay',
      });
      
      router.push('/');
    } catch {
      toast({
        variant: 'destructive',
        title: 'فشل تسجيل الدخول',
        description: 'تحقق من بريدك الإلكتروني وكلمة المرور',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push(`/auth/verify?phone=${phoneData.phone}`);
    } catch {
      toast({
        variant: 'destructive',
        title: 'فشل إرسال الرمز',
        description: 'تحقق من رقم الهاتف وحاول مرة أخرى',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          <span>العودة للرئيسية</span>
        </Link>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center space-y-4">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-3xl">C</span>
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
              <CardDescription>مرحباً بك مجدداً في ChariDay</CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="demo" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="demo">حسابات تجريبية</TabsTrigger>
                <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
              </TabsList>

              {/* Demo Accounts */}
              <TabsContent value="demo" className="space-y-4">
                {!isSeeded && (
                  <Button 
                    onClick={handleSeedDatabase} 
                    className="w-full"
                    disabled={isSeeding}
                  >
                    {isSeeding ? 'جاري إنشاء الحسابات...' : 'إنشاء الحسابات التجريبية'}
                  </Button>
                )}

                <div className="space-y-3">
                  {DEMO_ACCOUNTS.map((account) => {
                    const Icon = account.icon;
                    return (
                      <button
                        key={account.email}
                        onClick={() => handleDemoLogin(account)}
                        disabled={isLoading || !isSeeded}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className={`w-12 h-12 rounded-full ${account.color} flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 text-right">
                          <p className="font-medium">{account.name}</p>
                          <p className="text-sm text-muted-foreground">{account.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="text-center text-xs text-muted-foreground">
                  <p>كلمة المرور لجميع الحسابات: <code className="bg-muted px-1 rounded">demo123456</code></p>
                </div>
              </TabsContent>

              {/* Regular Login */}
              <TabsContent value="login">
                <Tabs defaultValue="phone" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="phone" className="gap-2">
                      <Phone className="h-4 w-4" />
                      رقم الهاتف
                    </TabsTrigger>
                    <TabsTrigger value="email" className="gap-2">
                      <Mail className="h-4 w-4" />
                      البريد الإلكتروني
                    </TabsTrigger>
                  </TabsList>

                  {/* Phone Login */}
                  <TabsContent value="phone">
                    <form onSubmit={handlePhoneLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <div className="flex gap-2">
                          <div className="flex items-center px-3 bg-muted rounded-lg border text-sm">
                            +213
                          </div>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="0555123456"
                            className="flex-1"
                            value={phoneData.phone}
                            onChange={(e) => setPhoneData({ phone: e.target.value })}
                            required
                            dir="ltr"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          سنرسل لك رمز تحقق عبر الواتساب
                        </p>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                      >
                        {isLoading ? 'جاري الإرسال...' : 'إرسال رمز التحقق'}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Email Login */}
                  <TabsContent value="email">
                    <form onSubmit={handleEmailLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@email.com"
                          value={emailData.email}
                          onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                          required
                          dir="ltr"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">كلمة المرور</Label>
                          <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                            نسيت كلمة المرور؟
                          </Link>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={emailData.password}
                            onChange={(e) => setEmailData({ ...emailData, password: e.target.value })}
                            required
                            dir="ltr"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute left-1 top-1 h-8 w-8"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                      >
                        {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="relative my-6">
                  <Separator />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                    أو
                  </span>
                </div>

                {/* Social Login */}
                <div className="space-y-2">
                  <Button variant="outline" className="w-full gap-2">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    المتابعة بحساب Google
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    المتابعة بحساب Facebook
                  </Button>
                </div>

                {/* Register Link */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                  ليس لديك حساب؟{' '}
                  <Link href="/auth/register" className="text-primary font-medium hover:underline">
                    إنشاء حساب جديد
                  </Link>
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
