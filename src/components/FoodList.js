'use client';
import Image from 'next/image';

const FoodList = ({ addToCart, removeFromCart, cart }) => {
    const foodItems = [
        { id: 1, name: 'Dish Name 1', price: 300, image: '/demo.jpeg', rating: 4.5, veg: true },
        { id: 2, name: 'Dish Name 2', price: 600, image: '/food3.png', rating: 3.5, veg: true },
        { id: 3, name: 'Dish Name 3', price: 499, image: '/food0.png', rating: 4.0, veg: true },
    ];

    return (
        <div className="md:p-4 rounded-lg mb-20">
            {foodItems.map((item) => (
                <div
                    key={item.id}
                    className="flex justify-between items-center p-4 bg-white border  shadow-2xl mb-4"
                >
                    {/* Food Info - Left Side */}
                    <div className="flex-1">
                        <div className="ml-4">
                            {/* Veg Sign - Above the Dish Name */}
                            <div className="flex flex-col items-start">
                                {item.veg && (
                                    <Image
                                        src='/sign.png'
                                        alt="Vegetarian"
                                        width={100}
                                        height={100}
                                        className="h-4 w-4 mb-1" // Adjust size and spacing
                                    />
                                )}
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                            </div>
                            <p className="text-sm text-gray-500">₹{item.price}</p>

                            {/* Add/Remove Button */}
                            {cart[item.id] ? (
                                <div className="flex items-center mt-2">
                                    <div className='p-1 bg-orange-500 rounded-md text-white'>
                                        <button
                                            onClick={() => removeFromCart(item)}
                                            className="px-2  mr-2 font-bold text-2xl"
                                        >
                                            -
                                        </button>
                                        <span className="text-lg ">{cart[item.id].quantity}</span>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="px-2  ml-2 font-bold text-2xl"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => addToCart(item)}
                                    className="mt-2 px-8 py-2 bg-orange-500 text-white text-sm rounded-md"
                                >
                                    Add
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Image and Rating - Right Side */}
                    <div className="ml-4 text-center">
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="h-24 w-40 object-cover rounded-lg"
                        />
                        {/* Rating Section - Below the Image */}
                        <div className="flex justify-center items-center mt-2">
                            <span className="text-sm font-medium text-gray-500">⭐</span>
                            <span className="text-sm font-semibold">{item.rating}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FoodList;
