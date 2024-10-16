'use client';

import Link from 'next/link';

const Footer = ({ total, cart }) => {
  const cartString = encodeURIComponent(JSON.stringify(cart)); // Convert cart object to JSON string

  return (
    total > 0 && (
      <div className="fixed bottom-5 w-full px-4">
        <div className="rounded-xl bg-orange-500 text-white p-4 flex justify-between items-center">
          <span className="text-lg font-bold">Total ₹{total}</span>
          <Link
            href={`/viewcart?cart=${cartString}`}
            className="bg-white text-orange-500 px-6 py-2 rounded-full"
          >
            View Cart
          </Link>
        </div>
      </div>
    )
  );
};

export default Footer;
