'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t hidden md:block">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">ChariDay</h3>
                <p className="text-xs text-muted-foreground">شاري داي</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              منصة التجارة الإلكترونية الرائدة في الجزائر. نسعى لتقديم أفضل تجربة تسوق إلكتروني بأفضل الأسعار وجودة عالية.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <nav className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary">
                من نحن
              </Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-primary">
                اتصل بنا
              </Link>
              <Link href="/faq" className="block text-sm text-muted-foreground hover:text-primary">
                الأسئلة الشائعة
              </Link>
              <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-primary">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-primary">
                الشروط والأحكام
              </Link>
              <Link href="/returns" className="block text-sm text-muted-foreground hover:text-primary">
                سياسة الإرجاع
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold mb-4">خدمة العملاء</h4>
            <nav className="space-y-2">
              <Link href="/track-order" className="block text-sm text-muted-foreground hover:text-primary">
                تتبع الطلب
              </Link>
              <Link href="/shipping" className="block text-sm text-muted-foreground hover:text-primary">
                الشحن والتوصيل
              </Link>
              <Link href="/payment" className="block text-sm text-muted-foreground hover:text-primary">
                طرق الدفع
              </Link>
              <Link href="/sell-with-us" className="block text-sm text-muted-foreground hover:text-primary">
                بيع معنا
              </Link>
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-bold">تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span dir="ltr">+213 555 123 456</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@chariday.dz</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>الجزائر العاصمة، الجزائر</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">اشترك في النشرة البريدية</p>
              <div className="flex gap-2">
                <Input placeholder="بريدك الإلكتروني" className="flex-1" />
                <Button>اشتراك</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 ChariDay. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">طرق الدفع:</span>
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-muted rounded flex items-center justify-center text-xs">
                  CIB
                </div>
                <div className="w-10 h-6 bg-muted rounded flex items-center justify-center text-xs">
                  EDAHABIA
                </div>
                <div className="w-10 h-6 bg-muted rounded flex items-center justify-center text-xs">
                  COD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
