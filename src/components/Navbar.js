import { FiSearch, FiShoppingCart} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";


export default function Navbar() {


  return (
    <>
      <nav className="bg-white py-4">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-8">
          {/* Logo */}
          <Image
            src='/logo1.png'
            width={100}
            height={100}
            alt="Logo"
            className="h-7 w-28 cursor-pointer"
            priority // Prioritize image loading
          />

          {/* Icons (Search, Cart, Menu) - Visible on small screens */}
          <div className="flex items-center space-x-4 md:hidden">
            <FiSearch className="text-gray-600 hover:text-gray-900 cursor-pointer" size={24} />
            <FiShoppingCart
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
              size={24}
            />
           <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition">
              Get App
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-16">
            <Link href="/restaurant" className="text-gray-600 hover:text-gray-900">
              Restaurant
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </div>

          {/* Desktop Icons and Login */}
          <div className="hidden md:flex items-center space-x-6">
            <FiSearch className="text-gray-600 hover:text-gray-900 cursor-pointer" size={20} />
            <FiShoppingCart
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
              size={20}
            />
           <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition">
              Get App
            </button>
          </div>
        </div>
      </nav>

      <hr className="border-t-2 border-gray-300" />
    </>
  );
}
