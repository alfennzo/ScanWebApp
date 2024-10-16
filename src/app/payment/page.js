'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'

const Payment = () => {
    const router = useRouter(); 
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const searchParams = useSearchParams(); // Access the URL search parameters
    const cartParam = searchParams.get('cart'); // Get cart from the URL
    const totalParam = searchParams.get('total'); // Get total from the URL

    useEffect(() => {
        // Load cart and total if they exist
        if (cartParam) {
          const parsedCart = JSON.parse(decodeURIComponent(cartParam)); // Decode and parse cart data
          setCart(parsedCart);
        }
        if (totalParam) {
          setTotal(parseFloat(totalParam)); // Convert total to number
        }
      }, [cartParam, totalParam]);
    
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        // Allow only numbers in the phone number
        if (/^\d*$/.test(value)) {
            setPhoneNumber(value);
        }
    };

    const handleProceed = () => {
        // Add logic for handling the payment flow
        console.log('Proceeding with phone number:', phoneNumber);
    };

    const handleCross = () => {
        router.back(); // Navigate back to the previous page
      };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
            {/* Header */}
            <div className="bg-[#FF7B2A] text-white py-12 rounded-b-[50px] relative"> {/* Increased padding to make the header taller */}
                <button className="absolute top-6 right-6 text-xl font-bold text-white" onClick={handleCross}>✖</button> {/* Added margin to position the close button properly */}
                <div className="flex justify-center mt-6"> {/* Added margin-top for gap between top and logo */}
                    <Image src='/logo1.png' width={100} height={100} alt="Logo" className="h-16 w-auto" /> {/* Increased logo size */}
                </div>
                <h3 className="text-center mt-6 text-lg font-semibold">Total Balance</h3> {/* Increased margin-top for spacing */}
                <h1 className="text-center text-3xl font-bold mt-2">₹ {total}</h1>
            </div>

            {/* Contact Details */}
            <div className="px-4">
                <label htmlFor="phone" className="block text-gray-600 mb-2 font-medium">
                    Contact Details
                </label>
                <div className="flex items-center bg-white border border-gray-300 rounded-md p-2">
                    <span className="text-gray-500">+91</span>
                    <input
                        id="phone"
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        className="ml-2 w-full outline-none"
                    />
                    <span className="text-red-500 ml-2" >*</span>
                </div>
            </div>

            {/* Proceed Button */}
            <div className="px-4 mb-6">
                <button
                    onClick={handleProceed}
                    disabled={!phoneNumber || phoneNumber.length < 10}
                    className={`w-full py-3 rounded-md text-lg font-bold ${phoneNumber.length === 10 ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500'
                        }`}
                >
                    Proceed
                </button>
            </div>
        </div>
    );
};

export default Payment;
