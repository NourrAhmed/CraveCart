import React from "react";
import { FaShippingFast, FaHeadset, FaComments, FaLock } from "react-icons/fa";

const FeaturesBox = () => {
  return (
    <div className="bg-[#212121] p-4 mx-8 md:mx-auto md:w-[600px] rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-24">
      <div className="flex items-start gap-3 text-white p-3">
        <div className="bg-[#800020] p-2 rounded-full flex items-center justify-center">
          <FaShippingFast className="text-[#FEE662] text-3xl" />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">Free Shipping</h4>
          <p className="text-xs text-white opacity-40">
            Free shipping on all your orders
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3 text-white p-3">
        <div className="bg-[#800020] p-2 rounded-full flex items-center justify-center">
          <FaHeadset className="text-[#FEE662] text-3xl" />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">
            Customer Support 24/7
          </h4>
          <p className="text-xs text-white opacity-40">
            Instant access to support
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3 text-white p-3">
        <div className="bg-[#800020] p-2 rounded-full flex items-center justify-center">
          <FaComments className="text-[#FEE662] text-3xl" />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">Customer Feedback</h4>
          <p className="text-xs text-white opacity-40">
            Customer Satisfaction is our priority
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3 text-white p-3">
        <div className="bg-[#800020] p-2 rounded-full flex items-center justify-center">
          <FaLock className="text-[#FEE662] text-3xl" />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">100% Secure Payment</h4>
          <p className="text-xs text-white opacity-40">
            We ensure your money is safe
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesBox;
