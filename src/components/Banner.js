'use client';
import Image from 'next/image';

const Banner = ({ brand }) => {
    return (
        <>
            {/* Logo and Outlet Info */}
            <div className="bg-white">
                <div className="flex p-2 flex-col md:flex-row  justify-between mb-2">
                    {/* Haldiram Logo and Outlet Name */}
                    <div className="flex ">
                        <Image
                            src="/haldiram.png"
                            alt="Haldiram Logo"
                            className="h-8 w-8 object-contain" // Adjust logo size
                            width={100}
                            height={100}
                        />
                        <div className="ml-3">
                            <h1 className="text-xl font-bold text-orange-600">{brand}</h1>
                            <p className="text-gray-600 text-sm">Haldiram&apos;s Connaught Place</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Banner Image */}
            <div className="bg-gray-300 md:h-80 h-32">
                <Image
                    src="/image.png"
                    width={500}
                    height={500}
                    alt="Haldiram Web Banner"
                    className="w-full h-full object-cover" // Adjust to make the image responsive
                />
            </div>
        </>
    );
};

export default Banner;
