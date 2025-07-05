import React from "react";
import { useCart } from "../context/CartContext";
import CartItemList from "../components/cart/CartItemList";
import CouponForm from "../components/cart/CouponForm";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/checkout/EmptyCart";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleIncreaseQuantity = (_id) => {
    const item = cartItems.find((item) => item._id === _id);
    if (item) {
      updateQuantity(_id, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (_id) => {
    const item = cartItems.find((item) => item._id === _id);
    if (item && item.quantity > 1) {
      updateQuantity(_id, item.quantity - 1);
    }
  };

  const subtotal = getCartTotal();
  const shipping = 5;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-white text-black p-8 space-y-8">
      <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-[#212121] text-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>

          <CartItemList
            items={cartItems}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
            onRemove={removeFromCart}
          />

          <CouponForm />
        </div>

        <CartSummary subtotal={subtotal} shipping={shipping} total={total} />
      </main>
    </div>
  );
}

export default Cart;
