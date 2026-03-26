'use client';

import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

// بيانات التقييمات الوهمية
const REVIEWS = [
  {
    id: '1',
    user: {
      name: 'أحمد محمد',
      avatar: 'https://ui-avatars.com/api/?name=Ahmed&background=f97316&color=fff',
    },
    rating: 5,
    comment: 'تجربة رائعة! المنتج وصل بسرعة وبجودة ممتازة. أنصح بشدة بالتسوق من هذه المنصة.',
    product: 'هاتف iPhone 15 Pro',
    date: '2024-01-15',
  },
  {
    id: '2',
    user: {
      name: 'فاطمة الزهراء',
      avatar: 'https://ui-avatars.com/api/?name=Fatima&background=ec4899&color=fff',
    },
    rating: 5,
    comment: 'خدمة عملاء ممتازة وأسعار تنافسية. أصبحت ChariDay وجهتي المفضلة للتسوق الإلكتروني.',
    product: 'حقيبة يد جلدية',
    date: '2024-01-10',
  },
  {
    id: '3',
    user: {
      name: 'كريم بن علي',
      avatar: 'https://ui-avatars.com/api/?name=Karim&background=22c55e&color=fff',
    },
    rating: 4,
    comment: 'منتجات ذات جودة عالية وتوصيل سريع. سعيد جداً بتجربتي الأولى.',
    product: 'سماعات لاسلكية',
    date: '2024-01-08',
  },
];

export function ReviewsSection() {
  return (
    <section className="py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2">ماذا يقول عملاؤنا</h2>
        <p className="text-muted-foreground">آراء حقيقية من عملائنا الكرام</p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {REVIEWS.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <Card className="relative overflow-hidden">
      {/* Quote Icon */}
      <Quote className="absolute top-4 left-4 h-8 w-8 text-muted-foreground/10" />
      
      <CardContent className="p-6">
        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              )}
            />
          ))}
        </div>

        {/* Comment */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          "{review.comment}"
        </p>

        {/* Product */}
        <p className="text-xs text-muted-foreground mb-4">
          المنتج: {review.product}
        </p>

        {/* User */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.user.avatar} alt={review.user.name} />
            <AvatarFallback>{review.user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{review.user.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(review.date).toLocaleDateString('ar-DZ', {
                year: 'numeric',
                month: 'long',
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
