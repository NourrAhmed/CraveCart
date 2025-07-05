import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CouponForm = () => {
  const formik = useFormik({
    initialValues: { coupon: "" },
    validationSchema: Yup.object({
      coupon: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(`Coupon Applied: ${values.coupon}`);
    },
  });

  return (
    <div className="mt-8 border-t border-gray-700 pt-6">
      <h3 className="text-xl font-semibold mb-4 text-white">
        Apply Coupon Code
      </h3>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
      >
        <input
          id="coupon"
          name="coupon"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.coupon}
          placeholder="Enter coupon code"
          className="flex-1 p-2 rounded-lg bg-white text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <button
          type="submit"
          className="bg-[#800020] text-white px-4 py-2 rounded-lg shadow-md"
        >
          Apply
        </button>
      </form>
      {formik.touched.coupon && formik.errors.coupon && (
        <div className="text-red-500 text-sm mt-2">{formik.errors.coupon}</div>
      )}
    </div>
  );
};

export default CouponForm;
