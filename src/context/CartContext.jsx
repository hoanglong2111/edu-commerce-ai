import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    console.error('❌ useCart must be used within CartProvider');
    // ✅ FALLBACK: Return safe default instead of throwing
    return {
      cartItems: [],
      loading: false,
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      getTotalPrice: () => 0,
      getTotalItems: () => 0,
      cartCount: 0,
      totalPrice: 0,
      totalItems: 0
    };
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log('🛒 CartProvider initializing...');

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        console.log('💾 Cart loaded from localStorage:', parsed.length);
        setCartItems(parsed);
      } else {
        console.log('💾 No cart found in localStorage');
      }
    } catch (error) {
      console.error('❌ Error loading cart:', error);
      setCartItems([]); // Safe fallback
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      console.log('💾 Cart saved to localStorage:', cartItems.length, 'items');
    } catch (error) {
      console.error('❌ Error saving cart:', error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    try {
      console.log('🛒 Adding to cart:', product?.name || 'Unknown product');
      
      if (!product || !product.id) {
        console.error('❌ Invalid product data:', product);
        message.error('❌ Sản phẩm không hợp lệ');
        return;
      }
      
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        
        if (existingItem) {
          console.log('📦 Item already in cart, updating quantity');
          message.info(`"${product.name}" đã có trong giỏ hàng`);
          return prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity || 0) + 1 }
              : item
          );
        } else {
          console.log('🆕 Adding new item to cart');
          message.success(`✅ Đã thêm "${product.name}" vào giỏ hàng`);
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      message.error('❌ Không thể thêm vào giỏ hàng');
    }
  };

  const removeFromCart = (productId) => {
    try {
      console.log('🗑️ Removing from cart:', productId);
      
      setCartItems(prevItems => {
        const filtered = prevItems.filter(item => item.id !== productId);
        message.success('🗑️ Đã xóa khỏi giỏ hàng');
        return filtered;
      });
    } catch (error) {
      console.error('❌ Error removing from cart:', error);
      message.error('❌ Không thể xóa khỏi giỏ hàng');
    }
  };

  const updateQuantity = (productId, quantity) => {
    try {
      console.log('📊 Updating quantity:', productId, quantity);
      
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    } catch (error) {
      console.error('❌ Error updating quantity:', error);
      message.error('❌ Không thể cập nhật số lượng');
    }
  };

  const clearCart = () => {
    try {
      console.log('🧹 Clearing cart');
      setCartItems([]);
      message.success('🧹 Đã xóa toàn bộ giỏ hàng');
    } catch (error) {
      console.error('❌ Error clearing cart:', error);
      message.error('❌ Không thể xóa giỏ hàng');
    }
  };

  // ✅ SAFE: Calculate total price with error handling
  const getTotalPrice = () => {
    try {
      return cartItems.reduce((total, item) => {
        const price = typeof item.price === 'number' ? item.price : 0;
        const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
        return total + (price * quantity);
      }, 0);
    } catch (error) {
      console.error('❌ Error calculating total price:', error);
      return 0;
    }
  };

  // ✅ SAFE: Calculate total items with error handling
  const getTotalItems = () => {
    try {
      return cartItems.reduce((total, item) => {
        const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
        return total + quantity;
      }, 0);
    } catch (error) {
      console.error('❌ Error calculating total items:', error);
      return 0;
    }
  };

  // ✅ COMPREHENSIVE: Export all needed properties
  const value = {
    // Core state
    cartItems: cartItems || [],
    loading,
    
    // Core functions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    
    // Computed values (for backward compatibility)
    cartCount: cartItems?.length || 0,
    totalPrice: getTotalPrice(),
    totalItems: getTotalItems(),
    
    // Legacy support
    itemCount: getTotalItems(), // ✅ This was missing!
    
    // Debug info
    _debug: {
      cartItemsLength: cartItems?.length || 0,
      cartItemsValid: Array.isArray(cartItems)
    }
  };

  console.log('🛒 CartContext value:', {
    cartCount: value.cartCount,
    totalItems: value.totalItems,
    itemCount: value.itemCount, // ✅ Now available!
    totalPrice: value.totalPrice,
    cartItemsLength: cartItems?.length || 0
  });

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
