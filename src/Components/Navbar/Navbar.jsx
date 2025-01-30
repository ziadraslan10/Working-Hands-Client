/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
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
import "./Navbar.css";
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
    <nav className="fixed top-0 left-0 right-0 bg-sky-500 py-5 px-10 lg:px-20 z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            ❤️
          </Link>
        </div>

        <div className="hidden md:flex space-x-2 text-white">
          <div className="flex text-lg items-center text-black ">

            {/*                login && register                  */}
            {!userLogin && (
              <div>
                <NavLink
                  to="/login"
                  className="hover:text-sky-700 py-2 px-5 mx-1 "
                >
                  تسجيل الدخول
                </NavLink>
                <NavLink
                  to="/register"
                  className="hover:text-sky-700 py-2 px-5 mx-1 "
                >
                  انشاء حساب
                </NavLink>
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
            <div
              onClick={() => deleteToken()}
              className="flex text-black items-center hover:text-blue-600 p-2 cursor-pointer "
            >
              <a className="">تسجيل الخروج </a>
              <div className="flex px-2 justify-center items-center font-light">
                {" "}
                <FaSignInAlt />
              </div>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button className="text-xl" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-800 py-4">
          <div className="px-4 space-y-4">

            {/*                        icons                  */}
            <div className="flex justify-center items-center bg-slate-200 py-2 rounded-md">
              <div className="p-1 text-lg hover:text-sky-600 cursor-pointer text-blue-700">
                <FaFacebook />
              </div>
              <div className="p-1 text-lg hover:text-sky-600 cursor-pointer">
                <FaTiktok />
              </div>
              <div className="p-1 text-lg hover:text-sky-600 cursor-pointer text-red-600">
                <FaYoutube />
              </div>
              <div className="p-1 text-lg hover:text-sky-600 cursor-pointer text-red-400">
                <FaInstagram />
              </div>
              <div className="p-1 text-lg text-black hover:text-sky-600 cursor-pointer">
                <FaSquareXTwitter />
              </div>
            </div>

            {/*                       logout                   */}
            {userLogin && (
              <div
                onClick={() => deleteToken()}
                className="flex cursor-pointer rounded-md bg-slate-200 justify-center text-center hover:text-sky-600 py-2 "
              >
                <a className="">Sign Out</a>
                <div className="flex px-2 justify-center items-center font-light">
                  {" "}
                  <FaSignInAlt />
                </div>
              </div>
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
