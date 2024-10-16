'use client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const ViewCart = () => {
  const router = useRouter();
  const { cart } = router.query; // Getting cart from query params (it will be a JSON string)
  const [cartItems, setCartItems] = useState([]);
  
  // Load cart items from the query string on page load
  useEffect(() => {
    if (cart) {
      setCartItems(JSON.parse(decodeURIComponent(cart))); // Decode the cart data
    }
  }, [cart]);

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="p-4">
      <h1 className="font-bold text-xl mb-4">Your Cart</h1>

      {/* Render cart items */}
      {cartItems.length ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div>
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
          <div className="mt-4 font-bold text-lg">Total: ₹{calculateTotal()}</div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default ViewCart;
