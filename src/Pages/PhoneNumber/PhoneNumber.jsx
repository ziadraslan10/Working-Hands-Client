/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterContext } from "../../Context/registerContext";
import { HiOutlineCheck } from "react-icons/hi";

function PhoneNumber() {
  let navigate = useNavigate();
  let { setidCode, registerData, setRegisterData } =
    useContext(RegisterContext);
  let [isLoading, setIsLoading] = useState(false);
  let [APIError, setAPIError] = useState("");
  let [isChecked, setIsChecked] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!isChecked) {
      setAPIError("يجب الموافقة على الشروط والأحكام");
      return;
    }
    
    setIsLoading(true);
    setAPIError("");

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const updatedData = { ...registerData, ...data };
    setRegisterData(updatedData);

    const finalData = new FormData();
    for (const key in updatedData) {
      if (key === "profilepicture" && updatedData[key] instanceof File) {
        finalData.append("profilepicture", updatedData[key]);
      } else {
        finalData.append(key, updatedData[key]);
      }
    }

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

      if (res.data.message === "Request created successfully") {
        setidCode(res.data.request.id);
        navigate("/successPage");
      }
    } catch (err) {
      setAPIError("خطأ في اسم المستخدم او الرقم الخاص او الاميل");
      setTimeout(() => {
        navigate("/register");
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
        <div className="mb-5">
          <label
            htmlFor="privatenumber"
            className="block mb-3 text-sm font-medium text-gray-900"
          >
            الرقم الخاص
          </label>
          <input
            type="tel"
            name="privatenumber"
            id="privatenumber"
            className="bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

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

        <div className="mb-5 flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="terms"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            أوافق على الشروط والأحكام  
          </label>
        </div>
        <div className="pb-2 text-gray-900 hover:underline hover:text-blue-400 flex text-center">
        {/* <div className=""><HiOutlineCheck /></div>  */}
        ✅<Link className="mx-1" to="/policy">سياسه الخصوصية والاستخدام</Link> 
        </div>

        <div className="mx-2 mt-10 flex justify-center">
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

      {APIError && (
        <div className="mt-4 text-red-500 text-center">
          <p>حدث خطأ: {APIError}</p>
        </div>
      )}
    </div>
  );
}

export default PhoneNumber;
