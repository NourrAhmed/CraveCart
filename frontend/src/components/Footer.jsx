import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#FFE662] text-[#800020] pt-2 text-center">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <Link to="/about" className="text-[#800020] font-semibold ml=0">
          About Us
        </Link>
        <Link to="/contact-us" className="text-[#800020] font-semibold">
          Contact Us
        </Link>
        <Link to="/faq" className="text-[#800020] font-semibold mr=0">
          FAQ
        </Link>
      </div>
      <p className="text-[#800020] mt-2">
        &copy; 2025 Crave Cart. All Rights Reserved.
      </p>
    </footer>
  );
}
