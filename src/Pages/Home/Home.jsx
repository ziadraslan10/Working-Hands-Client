/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainSlider from "../../Components/MainSlider/MainSlider";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
function Home() {
  let navigate = useNavigate();
  const [mainData, setMainData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function getMainData() {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/main`)
        .then((res) => {
          if (res.data.data && res.data.data.length > 0) {
            setMainData(res.data.data[0]);
          }
          setLoading(false);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    getMainData();
  }, []);

  return (
    <>
      <div>
        <div className="mb-8 text-center">
          <h1 className="font-bold text-2xl">مرحبا بكم </h1>
          <h1 className="font-bold text-2xl ">{mainData?.title}</h1>
        </div>
        <p className="text-center">{mainData?.description}</p>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4 mt-8 ">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            mainData?.MainPictures?.map((picture) => (
              <div key={picture.id}>
                <p className="mb-3 text-sm">{picture.title}</p>
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/${picture.url}`}
                  className="rounded-lg w-full h-auto"
                  alt={picture.title}
                />
              </div>
            ))
          )}
        </div>
        <div className="flex flex-col justify-center items-center">
          <button className="bg-gradient-to-b from-slate-100 to-sky-600 text-black px-4 py-2 rounded mt-8">
            <Link to="/login">تسجيل الدخول</Link>
          </button>
          <Link to="/register" className="text-sm mt-2 block ">
            لا تملك حساب؟{" "}
            <span className="text-sky-500 hover:text-sky-700">انشاء حساب</span>
          </Link>
        </div>
        <div className="flex lg:justify-center justify-evenly mt-4 lg:gap-6">
          <Link
            className="bg-sky-500 hover:bg-sky-600 py-2 px-3 rounded-lg text-sm"
            to="/forgetPassword"
          >
            هل نسيت كلمة المرور؟
          </Link>
          <button className="bg-gradient-to-r from-emerald-400 to-lime-600 text-sm py-2 px-3 rounded-lg">
            البحث عن الرقم الخاص
          </button>
        </div>
        <div className="my-6 mx-2 space-y-2">
          <p className="text-start text-2xl font-bold">اعلانات</p>
          <MainSlider />
        </div>
      </div>
    </>
  );
}

export default Home;
