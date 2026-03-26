'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// بيانات السلايدر الوهمية
const SLIDES = [
  {
    id: 1,
    title: 'عروض رمضان',
    subtitle: 'خصومات تصل إلى 50%',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop',
    link: '/deals/ramadan',
    color: 'from-brand-600 to-brand-700',
  },
  {
    id: 2,
    title: 'جديد الإلكترونيات',
    subtitle: 'أحدث الهواتف والأجهزة',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=400&fit=crop',
    link: '/categories/electronics',
    color: 'from-blue-600 to-purple-700',
  },
  {
    id: 3,
    title: 'أزياء الصيف',
    subtitle: 'تشكيلة جديدة من الموضة',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=400&fit=crop',
    link: '/categories/fashion',
    color: 'from-pink-600 to-rose-700',
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-muted">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(${currentSlide * 100}%)` }}
      >
        {SLIDES.map((slide) => (
          <Link
            key={slide.id}
            href={slide.link}
            className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 shrink-0"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Overlay */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-l opacity-70",
              slide.color
            )} />
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-10 lg:p-16 text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {slide.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg opacity-90 mb-4">
                {slide.subtitle}
              </p>
              <Button className="bg-white text-gray-900 hover:bg-white/90">
                تسوق الآن
              </Button>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/80 hover:bg-white text-gray-900"
        onClick={prevSlide}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/80 hover:bg-white text-gray-900"
        onClick={nextSlide}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentSlide === index
                ? "w-6 bg-white"
                : "bg-white/50 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </div>
  );
}
