"use client";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { IoRestaurantSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import LoginForm from "./LoginForm";
import { useState } from "react";

export default function SlideBar({ menuOpen, toggleMenu }) {
  const [showLogin, setShowLogin] = useState(false);
  const toggleLogin = () => setShowLogin(!showLogin);
  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full bg-white px-4 pb-4 transition-transform transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } w-64 md:hidden z-50`}
      >
        <button
          className="fixed right-4 top-2 text-gray-600 hover:text-gray-900 mb-4"
          onClick={toggleMenu}
        >
          <IoMdClose size={24} />
        </button>
        <div className="mt-12">
          <Link
            href="/restaurant"
            className="flex block text-gray-600 hover:text-gray-900 py-2"
          >
            <IoRestaurantSharp className="mr-2 mt-1" /> Restaurant
          </Link>
          <Link
            href="/"
            className="flex block text-gray-600 hover:text-gray-900 py-2"
          >
            <BsFillInfoSquareFill className="mr-2 mt-1" />
            About Us
          </Link>
          <Link
            href="/contact"
            className="flex block text-gray-600 hover:text-gray-900 py-2"
          >
            <FaPhoneAlt className="mr-2 mt-1" /> Contact
          </Link>
          <button
            onClick={toggleLogin}
            className="flex mx-auto mt-8 md:flex items-center px-16 py-1 rounded-full bg-[#FF7B2A] text-white transition"
          >
            <FiLogIn className="mr-2" size={18} />
            Login
          </button>
          <LoginForm showLogin={showLogin} toggleLogin={toggleLogin} />
        </div>
      </div>
    </>
  );
}
