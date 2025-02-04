/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterContext } from "../../Context/registerContext";

function PhoneNumber() {
  let navigate = useNavigate();
  let {setidCode, registerData, setRegisterData } = useContext(RegisterContext);
  let [isLoading, setIsLoading] = useState(false);
  let [APIError, setAPIError] = useState("");
  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);

  
    // Get form data from inputs
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
  
    // Merge new data with existing context data
    const updatedData = { ...registerData, ...data };
  
    // Update context
    setRegisterData(updatedData);
  
    // Prepare FormData for API request
    const finalData = new FormData();
  
    for (const key in updatedData) {
      if (key === "profilepicture" && updatedData[key] instanceof File) {
        finalData.append("profilepicture", updatedData[key]); // Append file correctly
      } else {
        finalData.append(key, updatedData[key]);
      }
    }
  
    // Debugging: Log FormData
    // for (let pair of finalData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
  
    // Send data to API
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/requests/addrequest`,
        finalData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log(res);
      if (res.data.message === "Request created successfully") {
        setidCode(res.data.request.id);
        navigate("/successPage");
      }
    } catch (err) {
      setAPIError("خطأ في اسم المستخدم او الرقم الخاص او الاميل");
      setTimeout(() => {
        navigate("/register")
      }, 5000);
    } finally {
      setIsLoading(false);
    }
    
  };
  
  

  return (
    <div className="py-6 max-w-xl mx-auto">
      <h2 className="flex justify-center text-2xl font-bold mb-10">
        أدخل رقم هاتفك ورقم فريد خاص بك
      </h2>
      <form onSubmit={handleRegister}>
        {/* Private Number */}
        <div className="mb-5">
          <label
            htmlFor="privatenumber"
            className="block mb-3 text-sm font-medium text-gray-900"
          >
            رقم خاص لا يتكرر
          </label>
          <input
            type="tel"
            name="privatenumber"
            id="privatenumber"
            className="bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-5">
          <label
            htmlFor="phonenumber"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            رقم الهاتف
          </label>
          <input
            type="tel"
            name="phonenumber"
            id="phonenumber"
            className="bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="mx-2 mt-20 flex justify-center">
          <button
            type="submit"
            className="bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-auto px-8 py-3 text-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin fa-lg"></i>
            ) : (
              "أرسال"
            )}
          </button>
        </div>
      </form>

      {/* Display API Error */}
      {APIError && (
        <div className="mt-4 text-red-500 text-center">
          <p>حدث خطأ: {APIError}</p>
        </div>
      )}
    </div>
  );
}

export default PhoneNumber;
