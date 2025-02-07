/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { FaSearch, FaHome, FaUser } from "react-icons/fa";
import { MdEmail, MdDateRange, MdOutlineWork } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { GiHighTide } from "react-icons/gi";
import { IoIosPhonePortrait } from "react-icons/io";
import { RiImageEditLine } from "react-icons/ri";

function UserSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUserData(null);

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/users/searchonuser`, {
        privatenumber: searchValue,
      })
      .then((response) => {
        console.log(response.data);
        setUserData(response.data.user);
      })
      .catch((err) => {
        console.log("error search", err);
        setError("المستخدم غير موجود أو حدث خطأ.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 min-h-96">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-right shadow-sm"
          placeholder="ابحث بالرقم الخاص..."
          required
        />
        <button
          type="submit"
          className="p-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-md transition-all"
        >
          <FaSearch />
        </button>
      </form>

      {/* Loading & Error Messages */}
      {loading && (
        <p className="text-right text-gray-600 mt-3">جاري البحث...</p>
      )}
      {error && <p className="text-right text-red-500 mt-3">{error}</p>}

      {/* Display User Data */}
      {userData && (
        <div className="mt-6 p-4 bg-sky-500 border text-white border-gray-200 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <img
              src={`${import.meta.env.VITE_BASE_URL}${userData.profilepicture}`}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-blue-500"
            />
            <div className="text-right flex-grow">
              <h2 className="text-lg font-semibold text-white">
                {userData.fullname}
              </h2>
              <p className="text-gray-700 text-sm">{userData.status}</p>
            </div>
          </div>

          <div className="mt-4 space-y-4 text-right">
            {/* <p className="flex items-center">
              <FaUser className="ml-2" />
              <span className="font-semibold mr-1">اسم المستخدم:</span>
              {userData.username}
            </p> */}
            <p className="flex items-center">
              <MdDateRange className="ml-2" />
              <span className="font-semibold mr-1">تاريخ الميلاد:</span>
              {new Date(userData.birthdate).toLocaleDateString("ar-EG")}
            </p>
            <p className="flex items-center">
              <FaHome className="ml-2" />
              <span className="font-semibold mr-1">يسكن في:</span>
              {userData.livesin}
            </p>
            <p className="flex items-center">
              <IoIosPhonePortrait className="ml-2" />
              <span className="font-semibold mr-1">الوظيفة:</span>
              {userData.jobtitle}
            </p>
            <p className="flex items-center">
              <RiImageEditLine  className="ml-2" />
              <span className="font-semibold mr-1">الطول:</span>
              {userData.height} سم
            </p>
            <p className="flex items-center">
              <FaPhone className="ml-2" />
              <span className="font-semibold mr-1">الرقم الخاص:</span>
              {userData.privatenumber}
            </p>
            <br />
            {/* <p className="flex items-center">
              <MdEmail className="ml-2" />
              <span className="font-semibold mr-1">البريد الإلكتروني:</span>
              {userData.email}
            </p> */}
            <p className="flex items-center">
              <FaPhone className="ml-2" />
              <span className="font-semibold mr-1">رقم الهاتف:</span>
              {userData.phonenumber}
            </p>
            <p className="flex items-center">
              <FaPhone className="ml-2" />
              <span className="font-semibold mr-1">رقم الأب:</span>
              {userData.fathernumber || "لم يتم اضافه رقم"}
            </p>
            <p className="flex items-center">
              <FaPhone className="ml-2" />
              <span className="font-semibold mr-1">رقم الأخ:</span>
              {userData.brothernumber || "لم يتم اضافه رقم"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
