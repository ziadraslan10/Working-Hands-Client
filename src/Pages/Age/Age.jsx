/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Age() {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);

  let validationSchema = Yup.object().shape({
    day: Yup.string().required("Required").max(2, "Too Long"),
      month: Yup.string().required("Required").max(2, "Too Long"),
      year: Yup.string().required("Required").max(4, "Too Long").min(4, "Too Short"),
  });

  function handelRegister() {
    setIsLoading(true);
    localStorage.setItem("userToken", "done");
    navigate("/phoneNumber");
    setIsLoading(false);
  }

  let formk = useFormik({
    initialValues: {
      day: "",
      month: "",
      year: "",
    },
    validationSchema,
    onSubmit: handelRegister,
  });

  return (
    <>
      <div className="py-6 max-w-xl mx-auto">
        <h2 className="flex justify-center text-3xl font-bold mb-10">
          أدخل تاريخ الميلادك
        </h2>

        <form onSubmit={formk.handleSubmit}>
          <div className="flex">
            {/*                            day                        */}
            <div className="mb-6 mx-2">
              <label
                htmlFor="day"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                اليوم 
              </label>
              <input
                type="number"
                name="day"
                id="day"
                value={formk.values.day}
                onChange={formk.handleChange}
                onBlur={formk.handleBlur}
                placeholder=""
                className=" bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              
            {formk.errors.day && formk.touched.day && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                  <span className="font-medium">{formk.errors.day}</span>
                </div>
              )}
            </div>
            {/*                            month                        */}
            <div className="mb-6 mx-2">
              <label
                htmlFor="month"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                الشهر 
              </label>
              <input
                type="number"
                name="month"
                id="month"
                value={formk.values.month}
                onChange={formk.handleChange}
                onBlur={formk.handleBlur}
                placeholder=""
                className=" bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              
            {formk.errors.month && formk.touched.month && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                  <span className="font-medium">{formk.errors.month}</span>
                </div>
              )}
            </div>
            {/*                            year                        */}
            <div className="mb-6 mx-2">
              <label
                htmlFor="year"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                العام 
              </label>
              <input
                type="number"
                name="year"
                id="year"
                value={formk.values.year}
                onChange={formk.handleChange}
                onBlur={formk.handleBlur}
                placeholder=""
                className=" bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              
            {formk.errors.year && formk.touched.year && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                  <span className="font-medium">{formk.errors.year}</span>
                </div>
              )}
            </div>

          </div>

          {/*                            btn                   */}
          <div className="mt-8 flex md:justify-evenly justify-end items-center">
            <div className="mx-2">
              <Link
                to="/housing-work"
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

export default Age;
