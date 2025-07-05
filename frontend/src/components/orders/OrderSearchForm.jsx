import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const OrderSearchForm = ({ onSearch }) => {
  const formik = useFormik({
    initialValues: {
      searchOrder: "",
    },
    validationSchema: Yup.object({
      searchOrder: Yup.string().matches(
        /^\d*$/,
        "Order number must contain only digits"
      ),
    }),
    validateOnChange: true,
    onSubmit: (values) => {
      onSearch(values.searchOrder);
    },
  });

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={formik.handleSubmit} className="flex items-center gap-4">
        <input
          type="text"
          id="searchOrder"
          name="searchOrder"
          placeholder="Search Order by ID"
          className="p-2 w-1/2 border border-gray-300 rounded-md"
          onChange={formik.handleChange}
          value={formik.values.searchOrder}
        />
        {formik.errors.searchOrder && (
          <div className="text-red-500">{formik.errors.searchOrder}</div>
        )}
      </form>
    </div>
  );
};

export default OrderSearchForm;
