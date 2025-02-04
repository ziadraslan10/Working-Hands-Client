/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterContext } from "../../Context/registerContext";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

function Register2() {
  let navigate = useNavigate();
  let { registerData, setRegisterData } = useContext(RegisterContext);
  console.log(registerData);

  let [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showRePassword, setShowRePassword] = useState(false); // State to toggle re-password visibility

  const handleRegister = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // if (data.password !== data.rePassword) {
    //   alert("Passwords do not match");
    //   setIsLoading(false);
    //   return;
    // }

    // Merge new data with existing registerData in context
    setRegisterData((prevData) => ({
      ...prevData,
      ...data,
    }));

    navigate("/housing-work");
    setIsLoading(false);
  };

  return (
    <div className="py-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-14">اضف رمزا للدخول</h2>
      <form onSubmit={handleRegister}>
        {/* Password */}
        <div className="mb-10 relative">
          <label htmlFor="password" className="block mb-3 text-sm font-medium text-gray-900">
            الرمز
          </label>
          <div className="relative">
            <button
              type="button"
              className="absolute inset-y-0 left-0 pl-3 flex items-center text-sm leading-5"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
            </button>
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              name="password"
              id="password"
              className="bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
              required
            />
          </div>
        </div>

        {/* Re-Password */}
        <div className="mb-10 relative">
          <label htmlFor="rePassword" className="block mb-3 text-sm font-medium text-gray-900">
            تاكيد الرمز
          </label>
          <div className="relative">
            <button
              type="button"
              className="absolute inset-y-0 left-0 pl-3 flex items-center text-sm leading-5"
              onClick={() => setShowRePassword(!showRePassword)} // Toggle re-password visibility
            >
              {showRePassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
            </button>
            <input
              type={showRePassword ? "text" : "password"} // Toggle input type
              name="rePassword"
              id="rePassword"
              className="bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
              required
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex md:justify-evenly justify-end items-center">
          <div className="mx-2">
            <Link
              to="/register"
              className="bg-slate-300 text-cyan-500 hover:text-cyan-600 hover:bg-slate-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-auto px-8 py-3 text-center"
            >
              السابق
            </Link>
          </div>
          <div className="mx-2">
            <button
              type="submit"
              className="bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-auto px-8 py-3 text-center"
              disabled={isLoading}
            >
              {isLoading ? <i className="fa-solid fa-spinner fa-spin fa-lg"></i> : "التالي"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register2;
