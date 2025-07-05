import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const loginValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
});

const signupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (values, { setSubmitting }) => {
    login(values)
      .then(() => {
        setSubmitting(false);
        navigate("/");
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  const handleSignup = (values, { setSubmitting }) => {
    const { confirmPassword, ...signupData } = values;
    register(signupData)
      .then(() => {
        setSubmitting(false);
        navigate("/");
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="bg-[#212121] m-auto mt-30 p-8 rounded-2xl w-130">
        <h2 className="text-white text-4xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={
            isLogin ? loginValidationSchema : signupValidationSchema
          }
          onSubmit={isLogin ? handleLogin : handleSignup}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="name"
                  type="text"
                  placeholder={isLogin ? "Name" : "Full Name"}
                  className="w-full p-3 rounded-xl bg-white text-black border border-gray-600 focus:border-[#FFE662] focus:outline-none"
                />
                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}
              </div>

              {!isLogin && (
                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded-xl bg-white text-black border border-gray-600 focus:border-[#FFE662] focus:outline-none"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>
              )}

              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 rounded-xl bg-white text-black border border-gray-600 focus:border-[#FFE662] focus:outline-none"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              {!isLogin && (
                <div>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-3 rounded-xl bg-white text-black border border-gray-600 focus:border-[#FFE662] focus:outline-none"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FFE662] text-[#212121] p-1.5 rounded-full hover:bg-[#FFD700] transition-colors disabled:opacity-50 font-light text-2xl"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#FFE662] hover:text-[#FFD700] transition-colors"
                >
                  {isLogin
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Login"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
