// src/context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode} from 'react';
import { CartItem } from '../interfaces/CartItem';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (newItem: CartItem) => void;
  removeFromCart: (itemId: string, index?: number) => void;
  incrementQuantity: (itemId: string, index: number) => void;
  decrementQuantity: (itemId: string, index: number) => void;
  completeOrder: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
  }
  

  export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // const addToCart = (itemToAdd: CartItem) => {
  //   setCartItems(prevItems => {
  //     const existingItemIndex = prevItems.findIndex(item => item.item.id === itemToAdd.item.id);
  //     if (existingItemIndex > -1) {
  //       const newItems = [...prevItems];
  //       newItems[existingItemIndex] = {
  //         ...newItems[existingItemIndex],
  //         quantity: newItems[existingItemIndex].quantity + itemToAdd.quantity
  //       };
  //       return newItems;
  //     } else {
  //       return [...prevItems, itemToAdd];
  //     }
  //   });
  // };

  const addToCart = (itemToAdd: CartItem) => [
    setCartItems(prevItems => [...prevItems, itemToAdd])
  ]

  const removeFromCart = (itemId: string, index?: number) => {
    setCartItems(prev => prev.filter((item, idx) => item.item.id !== itemId || (typeof index === 'number' && index !== idx)));
  };

  const incrementQuantity = (itemId: string, index: number) => {
    setCartItems(prev => prev.map((item, idx) => idx === index && item.item.id === itemId ? {...item, quantity: item.quantity + 1} : item));
  };

  const decrementQuantity = (itemId: string, index: number) => {
    setCartItems(prev => prev.map((item, idx) => {
      if (idx === index && item.item.id === itemId) {
        return {...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1};
      }
      return item;
    }));
  };

  const completeOrder = () => {
    setCartItems([])
    localStorage.removeItem('cart')
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, incrementQuantity, decrementQuantity, completeOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
