/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Register() {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required") ,
    fullName: Yup.string()
      .required("Required")
      .min(10, "Too Short")
      .max(30, "Too Long"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  function handelRegister() {
    setIsLoading(true);
    localStorage.setItem("userToken", "done");
    navigate("/register2");
    setIsLoading(false);
  }

  let formk = useFormik({
    initialValues: {
      name: "",
      fullName: "",
      email: "",
    },
    validationSchema,
    onSubmit: handelRegister,
  });

  return (
    <>
      <div className="py-6 max-w-xl mx-auto">

        <h2 className="flex justify-center text-3xl font-bold mb-6">
          انشاء حساب
        </h2>

        <form onSubmit={formk.handleSubmit}>
          {/*                            Name                       */}
          <div className="mb-5">
          <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              اسم المستخدم
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formk.values.name}
              onChange={formk.handleChange}
              onBlur={formk.handleBlur}
              placeholder=""
              className=" bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {formk.errors.name && formk.touched.name && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              <span className="font-medium">{formk.errors.name}</span>
            </div>
          )}
          {/*                            FullName                       */}
          <div className="mb-5">
          <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              الاسم الثلائي
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formk.values.fullName}
              onChange={formk.handleChange}
              onBlur={formk.handleBlur}
              placeholder=""
              className=" bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {formk.errors.fullName && formk.touched.fullName && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              <span className="font-medium">{formk.errors.fullName}</span>
            </div>
          )}
          {/*                            email                      */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              البريد الالكتروني
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formk.values.email}
              onChange={formk.handleChange}
              onBlur={formk.handleBlur}
              placeholder=""
              className=" bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {formk.errors.email && formk.touched.email && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              <span className="font-medium">{formk.errors.email}</span>
            </div>
          )}

          <div className="mt-8 flex md:justify-evenly justify-end">

            <div className="mx-2">
              <button
                type="submit"
                className="  bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-auto px-8 py-3 text-center  "
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin fa-lg"></i>
                ) : (
                  "التالي"
                )}
              </button>
            </div>

          </div>

        </form>
      </div>
    </>
  );
}

export default Register;
