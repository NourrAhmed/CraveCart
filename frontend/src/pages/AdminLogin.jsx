import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const loginValidationSchema = Yup.object().shape({
  name: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const signupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
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

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      setLoginError(null);
      const user = await login(values);
      if (user.role === "admin") {
        navigate("/admin/manageRestaurant");
      } else {
        setLoginError("Access denied. Admin privileges required.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      setLoginError(error.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      setLoginError(null);
      const { confirmPassword, ...signupData } = values;
      const user = await register({ ...signupData, role: "admin" });
      if (user.role === "admin") {
        navigate("/admin/manageRestaurant");
      } else {
        setLoginError("Failed to create admin account");
      }
    } catch (error) {
      setLoginError(error.response?.data?.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="bg-[#212121] m-auto mt-30 p-8 rounded-2xl w-130">
        <h2 className="text-white text-4xl font-bold mb-6 text-center">
          {isLogin ? "Admin Login" : "Admin Sign Up"}
        </h2>
        {loginError && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
            {loginError}
          </div>
        )}
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
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="name"
                  type="text"
                  placeholder={isLogin ? "Admin Username" : "Admin Username"}
                  className="w-full p-3 rounded-xl bg-white text-black border border-gray-600 focus:border-[#FFE662] focus:outline-none"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {!isLogin && (
                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Admin Email"
                    className="w-full p-3 rounded-xl bg-white text-black border border-gray-600 focus:border-[#FFE662] focus:outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Admin Password"
                  className="w-full p-3 rounded-xl bg-white text-black border border-gray-600 focus:border-[#FFE662] focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {!isLogin && (
                <div>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Admin Password"
                    className="w-full p-3 rounded-xl bg-white text-black border border-gray-600 focus:border-[#FFE662] focus:outline-none"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FFE662] text-[#212121] p-1.5 rounded-full hover:bg-[#FFD700] transition-colors disabled:opacity-50 font-light text-2xl"
              >
                {isSubmitting
                  ? isLogin
                    ? "Logging in..."
                    : "Signing up..."
                  : isLogin
                  ? "Login"
                  : "Sign Up"}
              </button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#FFE662] hover:text-[#FFD700] transition-colors"
                >
                  {isLogin
                    ? "Don't have an admin account? Sign Up"
                    : "Already have an admin account? Login"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminLogin;
