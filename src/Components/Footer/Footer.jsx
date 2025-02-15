/* eslint-disable no-unused-vars */
import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <div className="  w-full bg-[#3c8dad] p-4 text-slate-200">
        <h1 className=" font-bold text-center text-2xl">نظام الرصد الذكي</h1>
        <div>
          <ul className=" lg:flex justify-evenly items-center lg:my-6">
            {/* <li className="pt-1 ">
              <Link to=""> الشروط والاحكام</Link>
            </li> */}
            <li className="pt-1 ">
              <Link to="/whoweare">من نحن</Link>
            </li>
            <li className="pt-1 ">
              <Link to="/policy"> سياسة الخصوصية</Link>
            </li>
            {/* <li className="pt-1">
              <Link to=""> اتصل بنا</Link>
            </li> */}
          </ul>
        </div>
        <div>
          <div className="flex justify-center items-center">
            <div className="pl-3 text-lg  cursor-pointer ">
              <FaFacebook />
            </div>
            <div className="pl-3 text-lg  cursor-pointer ">
              <FaInstagram />
            </div>
            <div className="pl-3 text-lg  cursor-pointer ">
              <FaWhatsapp />
            </div>
          </div>
          <p className="text-center pt-1">جميع الحقوق محفوظة 2025@</p>
        </div>
      </div>
    </>
  );
}
