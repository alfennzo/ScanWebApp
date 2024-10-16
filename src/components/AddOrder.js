'use client'
import React, { useState, useCallback } from 'react';
import foodImage from "@/assets/food0.png";

// Brand name passed to components
const brandName = "Haldiram";

// Banner component
const Banner = ({ brand }) => {
  return (
    <div className="bg-gray-200 p-4 text-center">
      <h1 className="text-3xl font-bold">{brand}</h1>
      <p className="text-sm">Haldiram&apos;s Connaught Place</p>
      <div className="bg-gray-300 h-32 mt-4">Banner Placeholder</div>
    </div>
  );
};


const FoodList = ({ addToCart, removeFromCart, cart }) => {
  const foodItems = [
    { id: 1, name: 'Dish Name 1', price: 300, image: '/food0.png', rating: 4.5 },
    { id: 2, name: 'Dish Name 2', price: 300, image: '/food0.png', rating: 4.5 },
  ];

  return (
    <div className="p-4">
      {foodItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center p-4 bg-white border rounded-lg shadow-sm mb-4"
        >
          {/* Food Info - Now on the Left */}
          <div className="flex-1">
            <div className="ml-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">₹{item.price}</p>

              {/* Add/Remove Button */}
              {cart[item.id] ? (
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => removeFromCart(item)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md mr-2"
                  >
                    -
                  </button>
                  <span className="text-lg">{cart[item.id].quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md ml-2"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(item)}
                  className="mt-2 px-4 py-2 bg-orange-500 text-white text-sm rounded-md"
                >
                  Add
                </button>
              )}
            </div>
          </div>

          {/* Image - Now on the Right */}
          <div className="ml-4">
            <img src='/food0.png' alt={item.name} className="h-20 w-20 object-cover rounded-lg" />
          </div>
          
          {/* Rating Section */}
          <div className="flex items-center space-x-1 ml-4">
            <span className="text-sm font-medium text-gray-500">⭐</span>
            <span className="text-sm font-semibold">{item.rating}</span>
          </div>
        </div>
      ))}
    </div>
  );
};



// Footer component
const Footer = ({ total }) => {
  return (
    total > 0 && (
      <div className="fixed bottom-0 w-full bg-orange-500 text-white p-4 flex justify-between items-center">
        <span className="text-lg font-bold">Total ₹{total}</span>
        <button className="bg-white text-orange-500 px-6 py-2 rounded-full">
          View Cart
        </button>
      </div>
    )
  );
};

// Main AddOrder component
export default function AddOrder() {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);

  // Add item to cart
  const addToCart = (item) => {
    const updatedCart = { ...cart };
    if (!updatedCart[item.id]) {
      updatedCart[item.id] = { ...item, quantity: 1 };
    } else {
      updatedCart[item.id].quantity += 1;
    }
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  // Remove item from cart
  const removeFromCart = (item) => {
    const updatedCart = { ...cart };
    if (updatedCart[item.id]) {
      updatedCart[item.id].quantity -= 1;
      if (updatedCart[item.id].quantity <= 0) delete updatedCart[item.id];
    }
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  // Calculate total price
  const calculateTotal = (cart) => {
    const newTotal = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
  };

  return (
    <>
      {/* Banner Section */}
      <Banner brand={brandName} />

      {/* Food List Section */}
      <FoodList addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} />

      {/* Footer Section */}
      <Footer total={total} />
    </>
  );
}
