/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaYoutube,
  FaFacebook,
  FaWhatsapp ,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  return (<>
  <div className='bg-sky-600 p-4 text-slate-200'>
    <h1 className=' font-bold text-center text-2xl'>الايدي العاملة</h1>
    <div >
      <ul className=' lg:flex justify-evenly items-center lg:my-6'>
        <li  className='pt-1 '>
          <Link to="">من نحن</Link>
        </li>
        <li  className='pt-1 '>
          <Link to=""> سياسة الخصوصية</Link>
        </li>
        <li  className='pt-1 '>
          <Link to=""> الشروط والاحكام</Link>
        </li>
        <li  className='pt-1'>
          <Link to="">  اتصل بنا</Link>
        </li>
      </ul>
    </div>
    <div>
      <div className="flex justify-center items-center">
            <div className="pl-3 text-lg  cursor-pointer ">
              <FaFacebook />
            </div>
            <div className="pl-3 text-lg  cursor-pointer ">
              <FaTiktok />
            </div>
            <div className="pl-3 text-lg  cursor-pointer ">
              <FaWhatsapp />
            </div>
          </div>
          <p className='text-center pt-1'>جميع الحقوق محفوظة 2025@</p>
    </div>
  </div>
  </>
  )
}
