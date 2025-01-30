/* eslint-disable no-unused-vars */
import React from "react";
import img1 from "../../assets/9k=.jpeg";
import { Link, useNavigate } from "react-router-dom";
import MainSlider from "../../Components/MainSlider/MainSlider"


function Home() {
  let navigate = useNavigate();

  return (
    <>
      <div className=" text-center">
        <div className="mb-8 text-center">
          <h1 className="font-bold text-2xl">مرحبا بكم </h1>
          <h1 className="font-bold text-2xl "> مكتبة الايدي العاملة </h1>
        </div>
        <p className="text-center">
          هي موقع الكتروني متخصص في ربط الشباب الباحثين عن العمل بأصحاب الشركات
          والمؤسسات الباحثة عن موظفين.
        </p>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4 mt-8 ">
          <div>
            <p className="mb-3 text-sm">لندن عاصمة انجلترا</p>
            <img src={img1} className="rounded-lg" alt="" />
          </div>
          <div>
            <p className="mb-3 text-sm">باريس عاصمة فرنسا</p>
            <img src={img1} className="rounded-lg" alt="" />
          </div>
          <div>
            <p className="mb-3 text-sm">هنا القاهرة</p>
            <img src={img1} className="rounded-lg" alt="" />
          </div>
          <div>
            <p className="mb-3 text-sm">لندن عاصمة انجلترا</p>
            <img src={img1} className="rounded-lg" alt="" />
          </div>
        </div>
        <button className="  bg-gradient-to-b from-slate-100 to-sky-600 text-black px-4 py-2 rounded mt-8">
          <Link to="/login">تسجيل الدخول</Link>
        </button>
        <Link to="/register" className="text-sm mt-2 block ">
          {" "}
          لا تملك حساب؟{" "}
          <span className="text-sky-500 hover:text-sky-700">انشاء حساب</span>
        </Link>
        <div className="flex justify-evenly mt-4">
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
        <div className="my-6 mx-2">
          <p className="text-start text-2xl font-bold">اعلانات</p>
          <MainSlider/>
        </div>
      </div>
    </>
  );
}

export default Home;
