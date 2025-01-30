/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

function PhoneNumber() {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);

  let validationSchema = Yup.object().shape({
    privateNumber: Yup.string().required("Required"),
    number: Yup.string().required("Required"),
  });

  function handelRegister() {
    setIsLoading(true);
    localStorage.setItem("userToken", "done");
    navigate("/successPage");
    setIsLoading(false);
  }

  let formk = useFormik({
    initialValues: {
      privateNumber: "",
      number: "",
    },
    validationSchema,
    onSubmit: handelRegister,
  });
  return     <>
  <div className="py-6 max-w-xl mx-auto">

    <h2 className="flex justify-center text-2xl font-bold mb-10">
      أدخل رقم هاتفك ورقم فريد خاص بك
    </h2>

    <form onSubmit={formk.handleSubmit}>
      {/*                            privateNumber                       */}
      <div className="mb-5">
        <label
          htmlFor="privateNumber"
          className="block mb-3 text-sm font-medium text-gray-900 "
        >
          {`رقم خاص بك "فريد لا يتكرر"`}
        </label>
        <input
          type="tel"
          name="privateNumber"
          id="privateNumber"
          value={formk.values.privateNumber}
          onChange={formk.handleChange}
          onBlur={formk.handleBlur}
          placeholder=""
          className=" bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {formk.errors.privateNumber && formk.touched.privateNumber && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
          <span className="font-medium">{formk.errors.privateNumber}</span>
        </div>
      )}
      {/*                            number                       */}
      <div className="mb-5">
        <label
          htmlFor="number"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          رقم الهاتف 
        </label>
        <input
          type="tel"
          name="number"
          id="number"
          value={formk.values.number}
          onChange={formk.handleChange}
          onBlur={formk.handleBlur}
          placeholder=""
          className=" bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {formk.errors.number && formk.touched.number && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
          <span className="font-medium">{formk.errors.number}</span>
        </div>
      )}


        <div className="mx-2 mt-20 flex justify-center">
          <button
            type="submit"
            className="  bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-auto px-8 py-3 text-center  "
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin fa-lg"></i>
            ) : (
              "أرسال"
            )}
          </button>
      </div>
    </form>
  </div>
</>
}

export default PhoneNumber