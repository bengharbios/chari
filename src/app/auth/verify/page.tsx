'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Phone, RotateCcw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const phone = searchParams.get('phone') || '';
  const isRegister = searchParams.get('register') === 'true';
  
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [countdown]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        variant: 'destructive',
        title: 'الرمز غير مكتمل',
        description: 'أدخل رمز التحقق المكون من 6 أرقام',
      });
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsVerified(true);
      
      toast({
        title: 'تم التحقق بنجاح',
        description: isRegister ? 'تم إنشاء حسابك بنجاح' : 'تم تسجيل الدخول بنجاح',
      });

      // Redirect after success
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch {
      toast({
        variant: 'destructive',
        title: 'رمز غير صحيح',
        description: 'تحقق من الرمز وحاول مرة أخرى',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setCanResend(false);
    setCountdown(60);
    setOtp('');
    
    try {
      // TODO: Implement actual resend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'تم إرسال رمز جديد',
        description: 'تحقق من الواتساب',
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'فشل الإرسال',
        description: 'حاول مرة أخرى',
      });
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="border-0 shadow-xl max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">تم التحقق بنجاح!</h2>
            <p className="text-muted-foreground mb-6">
              {isRegister ? 'تم إنشاء حسابك' : 'تم تسجيل الدخول'} بنجاح
            </p>
            <p className="text-sm text-muted-foreground">
              جاري التحويل للصفحة الرئيسية...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link 
          href={isRegister ? "/auth/register" : "/auth/login"} 
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>العودة</span>
        </Link>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center space-y-4">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center">
                <Phone className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl">التحقق من الرقم</CardTitle>
              <CardDescription>
                أدخل الرمز المرسل إلى الواتساب
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Phone Number Display */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                تم إرسال الرمز إلى
              </p>
              <p className="font-medium text-lg" dir="ltr">
                +213 {phone}
              </p>
            </div>

            {/* OTP Input */}
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleVerify}
              className="w-full"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? 'جاري التحقق...' : 'تحقق'}
            </Button>

            {/* Resend */}
            <div className="text-center space-y-2">
              {canResend ? (
                <Button
                  variant="ghost"
                  onClick={handleResend}
                  className="gap-2 text-primary"
                >
                  <RotateCcw className="h-4 w-4" />
                  إرسال رمز جديد
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground">
                  إرسال رمز جديد خلال{' '}
                  <span className="font-medium text-primary">
                    {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                  </span>
                </p>
              )}
            </div>

            {/* Help */}
            <p className="text-xs text-center text-muted-foreground">
              لم تستلم الرمز؟ تحقق من رقم الهاتف أو{' '}
              <Link href="/contact" className="text-primary hover:underline">
                تواصل معنا
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Phone className="h-8 w-8 text-white" />
        </div>
        <p className="text-muted-foreground">جاري التحميل...</p>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyContent />
    </Suspense>
  );
}
