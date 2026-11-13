import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('shopsphere_cart');
      return savedCart ? JSON.parse(savedCart) : [
        // Seed default item for instant demo matching Google Stitch design
        {
          id: "sony-wh-1000xm5",
          quantity: 1,
          isGift: false
        }
      ];
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
      return [];
    }
  });

  // Saved for later items
  const [savedForLater, setSavedForLater] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_saved_later');
      return saved ? JSON.parse(saved) : [
        {
          id: "apple-macbook-air-m2",
          quantity: 1
        },
        {
          id: "fossil-gen-6-smartwatch",
          quantity: 1
        }
      ];
    } catch (e) {
      console.error("Failed to load saved items from localStorage", e);
      return [];
    }
  });

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shopsphere_cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  // Persist saved for later to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shopsphere_saved_later', JSON.stringify(savedForLater));
    } catch (e) {
      console.error("Failed to save saved items to localStorage", e);
    }
  }, [savedForLater]);

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { id: product.id, quantity, isGift: false }];
      }
    });
  };

  // Update quantity (min 1)
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Toggle gift option
  const toggleGift = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, isGift: !item.isGift } : item
      )
    );
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Save for later
  const saveForLater = (productId) => {
    const itemToSave = cart.find(item => item.id === productId);
    if (itemToSave) {
      removeFromCart(productId);
      setSavedForLater(prev => {
        if (prev.some(item => item.id === productId)) return prev;
        return [...prev, itemToSave];
      });
    }
  };

  // Move back to cart from saved
  const moveToCart = (productId) => {
    const itemToMove = savedForLater.find(item => item.id === productId);
    if (itemToMove) {
      setSavedForLater(prev => prev.filter(item => item.id !== productId));
      setCart(prev => {
        if (prev.some(item => item.id === productId)) return prev;
        return [...prev, itemToMove];
      });
    }
  };

  // Remove from saved for later
  const removeFromSaved = (productId) => {
    setSavedForLater(prev => prev.filter(item => item.id !== productId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Total item count in cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        savedForLater,
        addToCart,
        updateQuantity,
        removeFromCart,
        saveForLater,
        moveToCart,
        removeFromSaved,
        clearCart,
        toggleGift,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
