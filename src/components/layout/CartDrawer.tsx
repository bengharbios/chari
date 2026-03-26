'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal, getTotalItems } = useCart();
  const subtotal = getSubtotal();
  const totalItems = getTotalItems();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="left" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span>سلة التسوق</span>
            {totalItems > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({totalItems} منتج)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">السلة فارغة</h3>
            <p className="text-muted-foreground text-center mb-4">
              أضف منتجات للسلة لتبدأ التسوق
            </p>
            <Button onClick={closeCart} asChild>
              <Link href="/">
                تصفح المنتجات
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId || 'default'}`}
                    className="flex gap-3"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                      <Image
                        src={item.image}
                        alt={item.nameAr}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">
                        {item.nameAr}
                      </h4>
                      
                      {item.attributes && Object.keys(item.attributes).length > 0 && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {Object.entries(item.attributes)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(' | ')}
                        </p>
                      )}

                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-bold text-primary">
                          {(item.salePrice || item.price).toLocaleString('ar-DZ')} دج
                        </span>
                        {item.salePrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            {item.price.toLocaleString('ar-DZ')} دج
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1, item.variantId)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1, item.variantId)
                            }
                            disabled={item.quantity >= item.maxQuantity}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.productId, item.variantId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-4 border-t space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">المجموع الفرعي</span>
                  <span>{subtotal.toLocaleString('ar-DZ')} دج</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">الشحن</span>
                  <span className="text-success">مجاني</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>الإجمالي</span>
                  <span className="text-primary">{subtotal.toLocaleString('ar-DZ')} دج</span>
                </div>
              </div>

              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">
                  إتمام الطلب
                  <ArrowRight className="h-4 w-4 mr-2" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={closeCart}
                asChild
              >
                <Link href="/cart">
                  عرض السلة
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
