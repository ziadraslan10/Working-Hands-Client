/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

function PhoneNumber() {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);
  let [APIError, setAPIError] = useState("");

  let validationSchema = Yup.object().shape({
    privatenumber: Yup.string().required("Required"),
    phonenumber: Yup.string().required("Required"),
  });

  function handelRegister(values) {
    setIsLoading(true);
    let a = localStorage.getItem("redisterData");
    a = JSON.stringify({ ...JSON.parse(a), ...values });
    localStorage.setItem("redisterData", JSON.stringify({ ...JSON.parse(a) }));
    console.log(JSON.parse(a));
    //
    axios
    .post(`${import.meta.env.VITE_BASE_URL}/api/requests/addrequest`, JSON.parse(a))
    .then((res) => {
      if(res.data.message == "success"){
        navigate("/successPage");
      }
      setIsLoading(false);
    })
    .catch((res) => {
      setAPIError(res);
      setIsLoading(false);
    });
    //
    
  }

  let formk = useFormik({
    initialValues: {
      privatenumber: "",
      phonenumber: "",
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
      {/*                            privatenumber                       */}
      <div className="mb-5">
        <label
          htmlFor="privatenumber"
          className="block mb-3 text-sm font-medium text-gray-900 "
        >
          {`رقم خاص بك "فريد لا يتكرر"`}
        </label>
        <input
          type="tel"
          name="privatenumber"
          id="privatenumber"
          value={formk.values.privatenumber}
          onChange={formk.handleChange}
          onBlur={formk.handleBlur}
          placeholder=""
          className=" bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {formk.errors.privatenumber && formk.touched.privatenumber && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
          <span className="font-medium">{formk.errors.privatenumber}</span>
        </div>
      )}
      {/*                            number                       */}
      <div className="mb-5">
        <label
          htmlFor="phonenumber"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          رقم الهاتف 
        </label>
        <input
          type="tel"
          name="phonenumber"
          id="phonenumber"
          value={formk.values.phonenumber}
          onChange={formk.handleChange}
          onBlur={formk.handleBlur}
          placeholder=""
          className=" bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {formk.errors.phonenumber && formk.touched.phonenumber && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
          <span className="font-medium">{formk.errors.phonenumber}</span>
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