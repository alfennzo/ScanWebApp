'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter to navigate
import Navbar from "@/components/Navbar";

const ViewCart = () => {
  const router = useRouter(); // Initialize the useRouter hook
  const [cart, setCart] = useState([]);
  const [instructions, setInstructions] = useState('');

  // Load cart from sessionStorage on component mount
  useEffect(() => {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Convert the cart object into an array
  const cartItems = Object.values(cart);

  // Update cart item quantity or remove item if quantity is 1 and - is clicked
  const updateQuantity = (itemId, delta) => {
    let updatedCart = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: item.quantity + delta } // Update quantity
        : item
    );

    // If the item's quantity is less than or equal to 1, remove it from the cart
    updatedCart = updatedCart.filter(item => item.quantity > 0);

    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart)); // Update sessionStorage
  };

  // Calculate total costs
  const itemTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = itemTotal > 0 ? 30 : 0;  // Tax only applies if there's an item total
  const totalBalance = itemTotal + tax;

  const handlePayment = () => {
    // Only navigate to the payment page if the cart has items
    if (cartItems.length > 0) {
      // Create a query string to pass the total and cart items
      const cartString = encodeURIComponent(JSON.stringify(cart));
      router.push(`/payment?total=${totalBalance}&cart=${cartString}`); // Navigate to the Payment page with parameters
    }
  };
  return (
    <>
      <Navbar />
      <div className="p-4 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center">
            <Image src="/haldiram.png" alt="Logo" className="h-8 w-8" />
            <h1 className="ml-2 font-bold text-lg">Haldiram&apos;s Connaught Place</h1>
          </div>
          <button className="text-xl font-bold text-red-500">✖</button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Order Menu */}
        {cartItems.length > 0 ? (
          <>
            <h3 className="font-bold text-lg mb-4">Order Menu</h3>
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between mb-4 bg-white p-2 rounded-lg">
                  <div className="flex items-center">
                    <Image src='/assets/pizza.png' alt={item.name} className="h-20 w-20 object-cover rounded-full mr-4" />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-500">Large 500</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    {/* Quantity Controls */}
                    <div className="p-1 border-2 border-orange-500 rounded-md text-orange-500 flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1"
                      >
                        -
                      </button>
                      <span className="mx-2 text-lg font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1"
                      >
                        +
                      </button>
                    </div>
                    <span className="mt-2 text-lg font-bold text-orange-500">₹{item.price * item.quantity}</span> {/* Price aligned below */}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center min-h-[200px]">
            <h2 className="text-gray-500 text-lg">No orders in your cart</h2>
          </div>
        )}

        {/* Order Summary */}
        <h3 className="font-bold text-lg mt-6">Details Transaction</h3>
        <div className="flex justify-between mt-2">
          <span>Item Total</span>
          <span>₹{itemTotal > 0 ? itemTotal : 0}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Tax</span>
          <span>₹{tax}</span>
        </div>
        <div className="flex justify-between mt-4 font-bold text-lg">
          <span>Total Balance</span>
          <span>₹{totalBalance}</span>
        </div>

        {/* Payment Button */}
        <button
          className={`mt-6 w-full bg-orange-500 text-white py-3 rounded-md font-bold text-lg ${cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={cartItems.length === 0}
          onClick={handlePayment} // Navigate to payment when clicked
        >
          Payment
        </button>
      </div>
    </>
  );
};

export default ViewCart;
