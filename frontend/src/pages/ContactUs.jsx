import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { feedbackAPI } from "../config/api";

const ContactUs = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Name should contain only letters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (
    values,
    { resetForm, setSubmitting, setStatus }
  ) => {
    try {
      await feedbackAPI.create(values);
      setStatus({ success: true });
      resetForm();
    } catch (error) {
      setStatus({ error: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-lg w-full bg-[#800020] text-white rounded-xl p-6 shadow-lg">
        <h1 className="text-5xl font-bold text-[#FFE662] mb-10 text-center">
          Contact us
        </h1>
        <p className="mb-6 text-xl text-center">
          Your feedback matters! Contact us through the form below.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-4">
              {status?.error && (
                <div className="text-red-300 text-sm">{status.error}</div>
              )}
              {status?.success && (
                <div className="text-green-300 text-sm">
                  Thank you for your feedback! We'll get back to you soon.
                </div>
              )}

              <div>
                <label className="block mb-1 font-semibold">Name</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full p-2 rounded text-black bg-white"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-300 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 rounded text-black bg-white"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-300 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Message</label>
                <Field
                  as="textarea"
                  name="message"
                  rows="4"
                  className="w-full p-2 rounded text-black bg-white"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-300 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FFE662] text-[#800020] font-bold py-2 px-6 rounded hover:bg-yellow-400 transition disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-8 text-center text-lg">
          <p className="mb-1">
            📧 Email: <span className="underline">cravecart@gmail.com</span>
          </p>
          <p>📞 Phone: +201275922666 </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
