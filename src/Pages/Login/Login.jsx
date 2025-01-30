/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Login() {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required"),
  });

  function handelLogin() {
    setIsLoading(true);
    localStorage.setItem("userToken", "done");
    navigate("/");
    setIsLoading(false);
  }

  let formk = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handelLogin,
  });

  return (
    <>
      <div className="md:p-20 py-14 px-8  rounded-3xl  max-w-xl mx-auto main-color">

        <h2 className="text-3xl font-bold mb-6 flex justify-center">
          تسجيل الدخول
        </h2>
        <form onSubmit={formk.handleSubmit}>
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
              className="  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {formk.errors.email && formk.touched.email && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              <span className="font-medium">{formk.errors.email}</span>
            </div>
          )}
          {/*                           password                    */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
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
              className="  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {formk.errors.password && formk.touched.password && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              <span className="font-medium">{formk.errors.password}</span>
            </div>
          )}

          <div className="mt-8 ">
            <div className="flex justify-center">
              <button
                type="submit"
                className="  bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-auto px-5 py-3 text-center  "
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin fa-lg"></i>
                ) : (
                  "تسجيل الدخول"
                )}
              </button>
            </div>
            <div className="flex justify-center text-white mt-2">
              <p className="text-sm md:text-base ">
                ليس لديك حساب؟  
                <span>
                  <Link
                    to="/register"
                    className=" hover:text-slate-300 hover:underline font-semibold pr-1"
                  >
                    انشاء حساب 
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
