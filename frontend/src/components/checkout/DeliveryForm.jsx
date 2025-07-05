import React from "react";
import { Field, ErrorMessage } from "formik";

const DeliveryForm = () => {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-[#800020]">
        Delivery Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Field
            name="firstName"
            placeholder="First Name"
            className="border p-2 w-full"
          />
          <ErrorMessage
            name="firstName"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div>
          <Field
            name="lastName"
            placeholder="Last Name"
            className="border p-2 w-full"
          />
          <ErrorMessage
            name="lastName"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="md:col-span-2">
          <Field
            name="address"
            placeholder="Street address"
            className="border p-2 w-full"
          />
          <ErrorMessage
            name="address"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="md:col-span-2">
          <Field
            name="apartment"
            placeholder="Apartment (optional)"
            className="border p-2 w-full"
          />
        </div>
        <div>
          <Field name="city" placeholder="City" className="border p-2 w-full" />
          <ErrorMessage
            name="city"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div>
          <Field
            name="governorate"
            placeholder="Region"
            className="border p-2 w-full"
          />
          <ErrorMessage
            name="governorate"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div>
          <Field
            name="zipCode"
            placeholder="Zip code (optional)"
            className="border p-2 w-full"
          />
          <ErrorMessage
            name="zipCode"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="md:col-span-2">
          <Field
            name="email"
            placeholder="Email"
            className="border p-2 w-full"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="md:col-span-2">
          <Field
            name="phone"
            placeholder="Phone"
            className="border p-2 w-full"
          />
          <ErrorMessage
            name="phone"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
