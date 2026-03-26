'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft, Check, User, Store, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type UserType = 'BUYER' | 'SELLER' | 'STORE';

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    userType: 'BUYER' as UserType,
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const userTypes = [
    {
      value: 'BUYER',
      label: 'مشتري',
      description: 'تسوق واشترِ المنتجات',
      icon: ShoppingBag,
    },
    {
      value: 'SELLER',
      label: 'تاجر مستقل',
      description: 'بيع منتجاتك بسهولة',
      icon: User,
    },
    {
      value: 'STORE',
      label: 'متجر',
      description: 'أنشئ متجرك الإلكتروني',
      icon: Store,
    },
  ];

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Validate phone
      if (!formData.phone.startsWith('0') || formData.phone.length !== 10) {
        toast({
          variant: 'destructive',
          title: 'رقم الهاتف غير صالح',
          description: 'أدخل رقم هاتف جزائري صحيح',
        });
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'كلمات المرور غير متطابقة',
        description: 'تأكد من إدخال نفس كلمة المرور مرتين',
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast({
        variant: 'destructive',
        title: 'يجب الموافقة على الشروط',
        description: 'يرجى الموافقة على الشروط والأحكام',
      });
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'تم إنشاء الحساب بنجاح',
        description: 'سنرسل لك رمز التحقق عبر الواتساب',
      });
      
      router.push(`/auth/verify?phone=${formData.phone}&register=true`);
    } catch {
      toast({
        variant: 'destructive',
        title: 'فشل إنشاء الحساب',
        description: 'حدث خطأ، حاول مرة أخرى',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link href="/auth/login" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>العودة لتسجيل الدخول</span>
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
              <CardTitle className="text-2xl">إنشاء حساب جديد</CardTitle>
              <CardDescription>
                الخطوة {step} من 3
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            {/* Progress Bar */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    s <= step ? "bg-primary" : "bg-muted"
                  )}
                />
              ))}
            </div>

            {/* Step 1: Choose User Type */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="font-medium mb-2">ما نوع حسابك؟</h3>
                  <p className="text-sm text-muted-foreground">
                    اختر نوع الحساب المناسب لك
                  </p>
                </div>

                <RadioGroup
                  value={formData.userType}
                  onValueChange={(value) => setFormData({ ...formData, userType: value as UserType })}
                  className="space-y-3"
                >
                  {userTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <Label
                        key={type.value}
                        htmlFor={type.value}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                          formData.userType === type.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <RadioGroupItem value={type.value} id={type.value} className="sr-only" />
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{type.label}</p>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                        {formData.userType === type.value && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </Label>
                    );
                  })}
                </RadioGroup>

                <Button onClick={handleNext} className="w-full">
                  التالي
                </Button>
              </div>
            )}

            {/* Step 2: Phone Number */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="font-medium mb-2">أدخل رقم هاتفك</h3>
                  <p className="text-sm text-muted-foreground">
                    سنرسل لك رمز تحقق عبر الواتساب
                  </p>
                </div>

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
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    السابق
                  </Button>
                  <Button onClick={handleNext} className="flex-1">
                    التالي
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Complete Registration */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="أدخل اسمك الكامل"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني (اختياري)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={8}
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
                  <p className="text-xs text-muted-foreground">
                    يجب أن تكون 8 أحرف على الأقل
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    dir="ltr"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                    أوافق على{' '}
                    <Link href="/terms" className="text-primary hover:underline">
                      الشروط والأحكام
                    </Link>{' '}
                    و{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      سياسة الخصوصية
                    </Link>
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                    السابق
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
                  </Button>
                </div>
              </form>
            )}

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              لديك حساب بالفعل؟{' '}
              <Link href="/auth/login" className="text-primary font-medium hover:underline">
                تسجيل الدخول
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
