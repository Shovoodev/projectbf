import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import CORE from "../components/common/Reusables";
import img from "../images/whiteblacktulip.jpg";
const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // LOGIN
      const loginRes = await fetch(`${CORE}/blacktulipauth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      const loginData = await loginRes.json();
      if (!loginData._id) throw new Error("Login failed");

      localStorage.setItem("user", JSON.stringify(loginData));

      navigate(`/${loginData._id}/user`);
    } catch (err) {
      console.error("Error:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* Image Section - Left */}
      <div className="hidden md:block md:w-3/5 lg:w-1/2 relative">
        <img
          alt="Elegant floral background pattern"
          className="absolute inset-0 w-full h-full object-cover"
          src={img}
        />
        {/* Optional overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
      </div>

      {/* Login Form Section - Right */}
      <div className="flex-1 md:w-2/5 lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : (
          <div className="w-full max-w-md">
            {/* Mobile Image Header (only on small screens) */}
            <div className="md:hidden mb-8 rounded-2xl overflow-hidden">
              <img
                alt="Login background"
                className="w-full h-48 object-cover"
                src={img}
              />
            </div>

            <form
              className="w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl px-6 py-8 md:px-8 md:py-10"
              onSubmit={handleSubmit}
            >
              {/* Title */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Log in
                </h2>
                <p className="text-gray-600">
                  Enter your credentials to continue
                </p>
              </div>

              {/* Email Input */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">📧</span>
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">🔒</span>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => {
                      // Toggle password visibility logic here
                    }}
                  >
                    <span className="text-gray-500 hover:text-gray-700">
                      👁️
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between mb-8">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-700 text-sm">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
              >
                Log in
              </button>

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">
                  Or
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-colors"
                    onClick={() => {
                      // Navigate to sign up page
                    }}
                  >
                    Sign up
                  </button>
                </p>
              </div>

              {/* Security Note */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <span className="text-green-500">🔒</span>
                  <span>Your information is 100% secure</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;

// const handleSubmit = async (e) => {
//   await e.preventDefault();
//   console.log(userData);
//   setIsLoading(true);
//   await fetch(`${CORE}/blacktulipauth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//     credentials: "include",
//   })
//     .then((res) => res.json())
//     .then(async (data) => {
//       if (data._id) {
//         navigate(`/${user._id}/packages/basic`);
//         localStorage.setItem("user", JSON.stringify(data));
//       }
//     });
// };
