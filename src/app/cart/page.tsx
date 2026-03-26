'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, CreditCard, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { BottomNav, BottomNavSpacer } from '@/components/layout/BottomNav';
import { useCart } from '@/hooks/useCart';

// بيانات وهمية للسلة (للعرض)
const MOCK_CART_ITEMS = [
  {
    id: '1',
    productId: 'p1',
    name: 'آيفون 15 برو ماكس',
    nameAr: 'آيفون 15 برو ماكس',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop',
    price: 189900,
    salePrice: 169900,
    quantity: 1,
    store: 'متجر آبل',
    attributes: { اللون: 'أسود تيتانيوم', التخزين: '256GB' },
  },
  {
    id: '2',
    productId: 'p2',
    name: 'سامسونج جالكسي S24 ألترا',
    nameAr: 'سامسونج جالكسي S24 ألترا',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop',
    price: 159900,
    salePrice: 139900,
    quantity: 2,
    store: 'متجر سامسونج',
    attributes: { اللون: 'أسود', التخزين: '512GB' },
  },
];

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, clearCart } = useCart();
  
  // استخدام البيانات الوهمية للعرض
  const cartItems = items.length > 0 ? items : MOCK_CART_ITEMS;
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.salePrice || item.price) * item.quantity;
  }, 0);
  const shipping = subtotal >= 5000 ? 0 : 500;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return price.toLocaleString('ar-DZ') + ' دج';
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">سلة التسوق</h1>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">السلة فارغة</h2>
            <p className="text-muted-foreground text-center mb-6">
              أضف منتجات للسلة لتبدأ التسوق
            </p>
            <Button asChild>
              <Link href="/">
                تصفح المنتجات
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                        <Image
                          src={item.image}
                          alt={item.nameAr}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-medium line-clamp-2">{item.nameAr}</h3>
                            <p className="text-sm text-muted-foreground">{item.store}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive shrink-0"
                            onClick={() => removeItem(item.productId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {/* Attributes */}
                        {item.attributes && Object.keys(item.attributes).length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {Object.entries(item.attributes).map(([key, value]) => (
                              <Badge key={key} variant="secondary">
                                {key}: {value}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        {/* Price & Quantity */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-10 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="text-left">
                            <p className="font-bold text-primary">
                              {formatPrice((item.salePrice || item.price) * item.quantity)}
                            </p>
                            {item.salePrice && (
                              <p className="text-xs text-muted-foreground line-through">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" onClick={() => clearCart()}>
                <Trash2 className="h-4 w-4 ml-2" />
                إفراغ السلة
              </Button>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>ملخص الطلب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">المجموع الفرعي</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الشحن</span>
                    {shipping === 0 ? (
                      <Badge className="bg-green-500">مجاني</Badge>
                    ) : (
                      <span>{formatPrice(shipping)}</span>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>الإجمالي</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                  
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground text-center">
                      الشحن مجاني للطلبات فوق 5,000 دج
                    </p>
                  )}
                  
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/checkout">
                      إتمام الطلب
                      <ArrowRight className="h-4 w-4 mr-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Payment Methods */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">طرق الدفع</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-8 bg-muted rounded flex items-center justify-center text-xs">
                      CIB
                    </div>
                    <div className="flex-1 h-8 bg-muted rounded flex items-center justify-center text-xs">
                      EDAHABIA
                    </div>
                    <div className="flex-1 h-8 bg-muted rounded flex items-center justify-center text-xs">
                      COD
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Delivery Info */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">التوصيل</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    التوصيل خلال 2-5 أيام عمل لجميع الولايات
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <BottomNavSpacer />
      <BottomNav />
    </div>
  );
}
