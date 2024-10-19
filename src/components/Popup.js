'use client';
import { useState } from 'react';
import Image from 'next/image';

const Popup = ({ onClose }) => {
    const [selectedOption, setSelectedOption] = useState("Dine-In");

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        sessionStorage.setItem('userSelection', option); // Save user selection in session storage
        onClose(); // Close the popup
    };

    const imageSrc = selectedOption === "Take-Away" ? "/takeaway-image.png" : "/dinein-image.png"; // Replace with actual paths

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center relative md:p-8">

                {/* Image Section */}
                <div className="flex justify-center mb-6">
                    <Image
                        src={imageSrc}
                        alt={selectedOption === "Take-Away" ? "Take-Away" : "Dine-In"}
                        width={120}
                        height={120}
                        className="rounded-full border border-gray-200 shadow-md"
                    />
                </div>

                {/* Text Content */}
                <p className="text-base font-medium text-gray-700 mb-6 px-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                </p>

                {/* Switch Buttons for Take-Away and Dine-In */}
                <div className="flex justify-center ">
                    <div className='bg-orange-100 rounded-full'>
                        <button
                            className={`py-3 px-6 rounded-full font-bold transition ${selectedOption === "Take-Away"
                                ? "bg-orange-500 text-white"
                                : "bg-orange-100 text-orange-600"
                                }`}
                            onClick={() => handleOptionClick("Take-Away")}
                        >
                            TAKE-AWAY
                        </button>
                        <button
                            className={`py-3 px-6 rounded-full font-bold transition ${selectedOption === "Dine-In"
                                ? "bg-orange-500 text-white"
                                : "bg-orange-100 text-orange-600"
                                }`}
                            onClick={() => handleOptionClick("Dine-In")}
                        >
                            DINE-IN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
