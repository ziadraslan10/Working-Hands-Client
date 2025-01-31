/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { RegisterContext } from "../../Context/registerContext";  

function Register() {
  let { registerData, setregisterData } = useContext(RegisterContext);
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);
  let [selectedImage, setSelectedImage] = useState(null);

  var a = [];
  function SaveDataToLocalStorage(data)
  {       
      var receiveddata = JSON.stringify(data);
      a.push(receiveddata);
      alert(a);
  
      localStorage.setItem('session', a);
  
  }


  let validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    fullname: Yup.string().required("Required").min(5, "Too Short").max(30, "Too Long"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  function handelRegister(values) {
    setIsLoading(true);
    values.profilepicture = selectedImage;
    localStorage.setItem("redisterData", [JSON.stringify(values)]);
    let x = localStorage.getItem("redisterData")
    
    navigate("/register2");
    setIsLoading(false);
  }

  let formk = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      email: "",
    },
    validationSchema,
    onSubmit: handelRegister,
  });

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };




  return (
    <>
      <div className="py-6 max-w-xl mx-auto">
        <h2 className="flex justify-center text-3xl font-bold mb-6">
          انشاء حساب
        </h2>

        <form onSubmit={formk.handleSubmit} className="flex flex-col items-center">
          {/* Profile Image Upload (Circular) */}
          <div className="relative mb-6">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border-2 border-gray-400">
                {selectedImage ? (
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-600">+</span>
                )}
              </div>
            </label>
            <input
              type="file"
              accept="image/*"
              id="imageUpload"
              name="imageUpload"
              onChange={handleImageChange}
              value={formk.values.imageUpload}
              onBlur={formk.handleBlur}
              className="hidden"
            />
          </div>

          {/* username */}
          <div className="mb-5 w-full">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
              اسم المستخدم
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formk.values.username}
              onChange={formk.handleChange}
              onBlur={formk.handleBlur}
              className="bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {formk.errors.username && formk.touched.username && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              <span className="font-medium">{formk.errors.username}</span>
            </div>
          )}

          {/* Full Name */}
          <div className="mb-5 w-full">
            <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">
              الاسم الثلاثي
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={formk.values.fullname}
              onChange={formk.handleChange}
              onBlur={formk.handleBlur}
              className="bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {formk.errors.fullname && formk.touched.fullname && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              <span className="font-medium">{formk.errors.fullname}</span>
            </div>
          )}

          {/* Email */}
          <div className="mb-5 w-full">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              البريد الالكتروني
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formk.values.email}
              onChange={formk.handleChange}
              onBlur={formk.handleBlur}
              className="bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {formk.errors.email && formk.touched.email && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              <span className="font-medium">{formk.errors.email}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-8 py-3"
            >
              {isLoading ? <i className="fa-solid fa-spinner fa-spin fa-lg"></i> : "التالي"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
