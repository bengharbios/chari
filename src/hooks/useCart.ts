'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// عنصر السلة
export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  nameAr: string;
  image: string;
  price: number;
  salePrice?: number;
  quantity: number;
  maxQuantity: number;
  attributes?: Record<string, string>;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Computed
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (item) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.productId === item.productId && i.variantId === item.variantId
          );
          
          if (existingIndex > -1) {
            const items = [...state.items];
            const existing = items[existingIndex];
            items[existingIndex] = {
              ...existing,
              quantity: Math.min(existing.quantity + item.quantity, item.maxQuantity),
            };
            return { items };
          }
          
          return { items: [...state.items, item] };
        });
      },
      
      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.variantId === variantId)
          ),
        }));
      },
      
      updateQuantity: (productId, quantity, variantId) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.productId === productId && item.variantId === variantId) {
              return { ...item, quantity: Math.min(Math.max(1, quantity), item.maxQuantity) };
            }
            return item;
          }),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.salePrice || item.price;
          return total + price * item.quantity;
        }, 0);
      },
      
      getTotal: () => {
        const subtotal = get().getSubtotal();
        // يمكن إضافة تكلفة الشحن والضرائب هنا
        return subtotal;
      },
    }),
    {
      name: 'chariday-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
