/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import mainLogo from "../../assets/logo.jpg";
import { FaRegUser } from "react-icons/fa";
import {
  FaYoutube,
  FaInstagram,
  FaSignInAlt,
  FaFacebook,
  FaBars,
  FaTimes,
  FaTiktok,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserTokenContext } from "../../Context/userTokenContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserTokenContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  function deleteToken() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <nav className=" bg-sky-500 py-5 px-10 lg:px-20 z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center rounded-full">
          <Link to="/">
            <img
              src={mainLogo}
              alt="Main Logo"
              className="w-40 h-full rounded-md"
            />
          </Link>
        </div>

        <div className="hidden md:flex space-x-2 text-white">
          <div className="flex text-lg items-center text-black ">
            {/*                login && register                  */}
            {!userLogin && (
              <div className="flex justify-center items-center gap-2">
                <NavLink to="/login">تسجيل الدخول</NavLink>
                <NavLink to="/register">انشاء حساب</NavLink>
              </div>
            )}
          </div>

          {/*                      icons                   */}
          {/* <div className="flex justify-center items-center">
            <div className=" text-lg hover:text-sky-700 cursor-pointer text-blue-500">
              <FaFacebook />
            </div>
            <div className="pl-3 text-lg hover:text-sky-600 cursor-pointer text-black">
              <FaTiktok />
            </div>
            <div className="pl-3 text-lg hover:text-sky-600 cursor-pointer text-red-500">
              <FaYoutube />
            </div>
            <div className="pl-3 text-lg hover:text-sky-600 cursor-pointer text-black ">
              <FaSquareXTwitter />
            </div>
            <div className="pl-3 text-lg hover:text-sky-600 cursor-pointer text-pink-600">
              <FaInstagram />
            </div>
          </div> */}

          {/*                       logout                   */}
          {userLogin && (
            <>
              <div className="flex cursor-pointer rounded-md items-center  justify-center text-center hover:text-sky-600">
                <Link className=" px-5" to="/userdata">
                  {" "}
                  <FaRegUser />{" "}
                </Link>
                <div
                  onClick={() => deleteToken()}
                  className="flex text-white items-center hover:text-blue-600 p-2 cursor-pointer "
                >
                  <a className="">تسجيل الخروج </a>
                  <div className="flex px-2 justify-center items-center font-light">
                    {" "}
                    <FaSignInAlt />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button className="text-xl" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-800 py-4 ">
          <div className="px-4 space-y-4">
            {/*                       logout                   */}
            {userLogin && (
              <>
                <div className="flex cursor-pointer rounded-md bg-slate-200 justify-center text-center hover:text-sky-600 py-2">
                  <Link className=" px-5" to="/userdata">
                    {" "}
                    <FaRegUser />{" "}
                  </Link>
                </div>
                <div
                  onClick={() => deleteToken()}
                  className="flex cursor-pointer rounded-md bg-slate-200 justify-center text-center hover:text-sky-600 py-2 "
                >
                  <a className="">تسجيل الخروج</a>
                  <div className="flex px-2 justify-center items-center font-light">
                    {" "}
                    <FaSignInAlt />
                  </div>
                </div>
              </>
            )}

            {/*                    login && register                  */}
            {!userLogin && (
              <div>
                <NavLink
                  onClick={() => toggleMenu()}
                  to="login"
                  className="rounded-md mb-5 bg-slate-200 block text-center py-2 hover:text-sky-600"
                >
                  تسجيل الدخول{" "}
                </NavLink>
                <NavLink
                  onClick={() => toggleMenu()}
                  to="register"
                  className="rounded-md  bg-slate-200 block text-center py-2 hover:text-sky-600"
                >
                  انشاء حساب{" "}
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
