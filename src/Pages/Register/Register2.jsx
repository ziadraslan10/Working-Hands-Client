/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Register2() {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);

  let validationSchema = Yup.object().shape({
    password: Yup.string().required("Required"),
    rePassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  function handelRegister(values) {
    setIsLoading(true);
    let a = localStorage.getItem("redisterData");
    a = JSON.stringify({ ...JSON.parse(a), ...values });
    localStorage.setItem("redisterData", JSON.stringify({ ...JSON.parse(a) }));
    navigate("/housing-work");
    setIsLoading(false);
  }

  let formk = useFormik({
    initialValues: {
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handelRegister,
  });

  return (
    <>
      <div className="py-6 max-w-xl mx-auto">

        <h2 className=" text-2xl font-bold mb-14">اضف رمزا للدخول</h2>

        <form onSubmit={formk.handleSubmit}>
          {/*                           password                    */}
          <div className="mb-10">
            <label
              htmlFor="password"
              className="block mb-3 text-sm font-medium text-gray-900 "
            >
              الرمز
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formk.values.password}
              onChange={formk.handleChange}
              onBlur={formk.handleBlur}
              placeholder=""
              className=" bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {formk.errors.password && formk.touched.password && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              <span className="font-medium">{formk.errors.password}</span>
            </div>
          )}
          {/*                           repassword                    */}
          <div className="mb-10">
            <label
              htmlFor="rePassword"
              className="block mb-3 text-sm font-medium text-gray-900 "
            >
              تاكيد الرمز
            </label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              value={formk.values.rePassword}
              onChange={formk.handleChange}
              onBlur={formk.handleBlur}
              placeholder=""
              className=" bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {formk.errors.rePassword && formk.touched.rePassword && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              <span className="font-medium">{formk.errors.rePassword}</span>
            </div>
          )}

          <div className="mt-8 flex md:justify-evenly justify-end items-center">
            <div className="mx-2">
              <Link
                to="/register"
                className="  bg-slate-300 text-cyan-500 hover:text-cyan-600 hover:bg-slate-400  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-auto px-8 py-3 text-center  "
              >
                السابق
              </Link>
            </div>
            <div className="mx-2">
              <button
                type="submit"
                className="  bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-auto px-8 py-3 text-center  "
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

export default Register2;
