import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Restaurant name is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"),
});

const initialValues = {
  name: "",
  description: "",
  image: null,
};

const AddRestaurantForm = ({ onSubmit }) => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("image", values.image);
    formData.append(
      "owner",
      localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).id
        : null
    );

    onSubmit(formData, { setSubmitting, resetForm });
  };

  return (
    <div className="bg-[#2e2e2e] shadow-lg rounded-2xl p-8 border border-[#FFE662]">
      <h2 className="text-3xl font-bold text-[#FFE662] mb-6 text-center">
        Add a New Restaurant
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-5">
            <div>
              <label className="block font-medium mb-1 text-[#FFE662]">
                Restaurant Name
              </label>
              <Field
                name="name"
                placeholder="e.g., Spicy Kitchen"
                className="w-full p-3 border border-gray-400 rounded-lg bg-[#1d1d1d] text-white focus:outline-none focus:ring-2 focus:ring-[#FFE662]"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-[#FFE662]">
                Description
              </label>
              <Field
                name="description"
                placeholder="Short description"
                className="w-full p-3 border border-gray-400 rounded-lg bg-[#1d1d1d] text-white focus:outline-none focus:ring-2 focus:ring-[#FFE662]"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-[#FFE662]">
                Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) =>
                  setFieldValue("image", event.currentTarget.files[0])
                }
                className="w-full p-2 border border-gray-400 rounded-lg bg-[#1d1d1d] text-white"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-[#800020] text-[#FFE662] font-semibold px-6 py-2 rounded-full shadow hover:shadow-lg hover:scale-105 transition duration-200"
              >
                Add Restaurant
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRestaurantForm;
