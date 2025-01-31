/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Housing_Work() {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);

  let validationSchema = Yup.object().shape({
    livesin: Yup.string().required("Required"),
    jobtitle: Yup.string()
      .required("Required")
      .min(4, "Too Short")
      .max(30, "Too Long"),
    height: Yup.string().required("Required"),
  });

  function handelRegister(values) {
    setIsLoading(true);
    let a = localStorage.getItem("redisterData");
    a = JSON.stringify({ ...JSON.parse(a), ...values });
    localStorage.setItem("redisterData", JSON.stringify({ ...JSON.parse(a) }));
    navigate("/age");
    setIsLoading(false);
  }

  let formk = useFormik({
    initialValues: {
      livesin: "",
      jobtitle: "",
      height: "",
    },
    validationSchema,
    onSubmit: handelRegister,
  });

  return (
    <>
      <div className="py-6 max-w-xl mx-auto">

        <h2 className="flex justify-center text-3xl font-bold mb-10">
          أين تسكن وماذا تعمل الان
        </h2>

        <form onSubmit={formk.handleSubmit}>
          {/*                            livesin                       */}
          <div className="mb-5">
            <label
              htmlFor="livesin"
              className="block mb-3 text-sm font-medium text-gray-900 "
            >
              السكن
            </label>
            <input
              type="text"
              name="livesin"
              id="livesin"
              value={formk.values.livesin}
              onChange={formk.handleChange}
              onBlur={formk.handleBlur}
              placeholder=""
              className=" bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {formk.errors.livesin && formk.touched.livesin && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              <span className="font-medium">{formk.errors.livesin}</span>
            </div>
          )}
          {/*                            jobtitle                       */}
          <div className="mb-5">
            <label
              htmlFor="jobtitle"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              الاسم الوظيفي
            </label>
            <input
              type="text"
              name="jobtitle"
              id="jobtitle"
              value={formk.values.jobtitle}
              onChange={formk.handleChange}
              onBlur={formk.handleBlur}
              placeholder=""
              className=" bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {formk.errors.jobtitle && formk.touched.jobtitle && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              <span className="font-medium">{formk.errors.jobtitle}</span>
            </div>
          )}
          {/*                            height                      */}
          <div className="mb-5">
            <label
              htmlFor="height"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              الطول 
            </label>
            <input
              type="text"
              name="height"
              id="height"
              value={formk.values.height}
              onChange={formk.handleChange}
              onBlur={formk.handleBlur}
              placeholder=""
              className=" bg-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {formk.errors.height && formk.touched.height && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              <span className="font-medium">{formk.errors.height}</span>
            </div>
          )}

          <div className="mt-8 flex md:justify-evenly justify-end items-center">
            <div className="mx-2">
              <Link
                to="/register2"
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

export default Housing_Work;
