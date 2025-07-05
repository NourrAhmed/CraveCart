import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (menuItem, quantity = 1) => {
    try {
      setLoading(true);
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item._id === menuItem._id
        );
        if (existingItem) {
          return prevItems.map((item) =>
            item._id === menuItem._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevItems, { ...menuItem, quantity }];
      });
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add item to cart");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = (menuItemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== menuItemId)
    );
  };

  const updateQuantity = (menuItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === menuItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
