'use client';
import { useState, useEffect } from 'react';
import Banner from '@/components/Banner';
import FoodList from '@/components/FoodList';
import Footer from '@/components/Footer';
import Navbar from "../components/Navbar";

// Brand name passed to components
const brandName = 'Haldiram';

export default function Home() {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);

  // Load cart from sessionStorage on component mount
  useEffect(() => {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart)); // Load the stored cart
      calculateTotal(JSON.parse(storedCart)); // Calculate total on load
    }
  }, []);

  // Save the cart to sessionStorage every time it changes
  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      sessionStorage.setItem('cart', JSON.stringify(cart)); // Save cart in sessionStorage
    }
  }, [cart]);

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
      <Navbar/>

      {/* Banner Section */}
      <Banner brand={brandName} />

      {/* Food List Section */}
      <FoodList addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} />

      {/* Footer Section */}
      <Footer total={total} cart={cart} />
    </>
  );
}
