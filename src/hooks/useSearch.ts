'use client';

import { useState, useCallback } from 'react';

// خيارات البحث
export interface SearchOptions {
  query: string;
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'newest' | 'best_selling';
  page?: number;
  limit?: number;
}

// نتيجة البحث
export interface SearchResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

interface Product {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  basePrice: number;
  salePrice?: number;
  images: { url: string }[];
  rating: number;
  totalReviews: number;
  store?: { storeName: string; storeNameAr: string };
}

interface SearchState {
  results: SearchResult | null;
  isLoading: boolean;
  error: string | null;
  recentSearches: string[];
}

const RECENT_SEARCHES_KEY = 'chariday-recent-searches';
const MAX_RECENT_SEARCHES = 10;

export function useSearch() {
  const [state, setState] = useState<SearchState>({
    results: null,
    isLoading: false,
    error: null,
    recentSearches: getRecentSearches(),
  });

  // البحث عن المنتجات
  const search = useCallback(async (options: SearchOptions) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const params = new URLSearchParams();
      params.set('q', options.query);
      if (options.categoryId) params.set('categoryId', options.categoryId);
      if (options.brandId) params.set('brandId', options.brandId);
      if (options.minPrice) params.set('minPrice', options.minPrice.toString());
      if (options.maxPrice) params.set('maxPrice', options.maxPrice.toString());
      if (options.sortBy) params.set('sortBy', options.sortBy);
      if (options.page) params.set('page', options.page.toString());
      if (options.limit) params.set('limit', options.limit.toString());

      const res = await fetch(`/api/search?${params.toString()}`);
      
      if (!res.ok) {
        throw new Error('فشل البحث');
      }

      const data: SearchResult = await res.json();
      
      // إضافة البحث للسجل
      if (options.query.trim()) {
        addToRecentSearches(options.query.trim());
        setState((prev) => ({
          ...prev,
          results: data,
          isLoading: false,
          recentSearches: getRecentSearches(),
        }));
      } else {
        setState((prev) => ({ ...prev, results: data, isLoading: false }));
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'حدث خطأ أثناء البحث',
      }));
    }
  }, []);

  // البحث السريع (للإكمال التلقائي)
  const quickSearch = useCallback(async (query: string): Promise<Product[]> => {
    if (!query.trim()) return [];

    try {
      const res = await fetch(`/api/search/quick?q=${encodeURIComponent(query)}`);
      if (!res.ok) return [];
      
      const data = await res.json();
      return data.products || [];
    } catch {
      return [];
    }
  }, []);

  // مسح سجل البحث
  const clearRecentSearches = useCallback(() => {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    setState((prev) => ({ ...prev, recentSearches: [] }));
  }, []);

  // إزالة عنصر من سجل البحث
  const removeRecentSearch = useCallback((query: string) => {
    const searches = getRecentSearches().filter((s) => s !== query);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
    setState((prev) => ({ ...prev, recentSearches: searches }));
  }, []);

  return {
    ...state,
    search,
    quickSearch,
    clearRecentSearches,
    removeRecentSearch,
  };
}

// مساعدات
function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function addToRecentSearches(query: string) {
  const searches = getRecentSearches().filter((s) => s !== query);
  const updated = [query, ...searches].slice(0, MAX_RECENT_SEARCHES);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
}
