/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaSave } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function UserData() {
  const [userData, setUserData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [updatedValue, setUpdatedValue] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [pendingApprovalMessage, setPendingApprovalMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/users/getme`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        console.log("User Data:", res.data.user);
        setUserData(res.data.user);
        setOriginalData(res.data.user);
      })
      .catch((err) => {
        console.error("Error fetching user data", err);
      });
  }, []);

  const fieldLabels = {
    fullname: "اسم المستخدم",
    email: "البريد الإلكتروني",
    phonenumber: "رقم الهاتف",
    birthdate: "تاريخ الميلاد",
    livesin: "المسكن",
    fathernumber: "رقم الأب",
    brothernumber: "رقم الأخ",
    privatenumber: "الرقم الخاص",
    height: "الطول",
    jobtitle: "الوظيفة",
    username: "اسم المستخدم",
    status: "الحالة",
  };

  const handleEdit = (field, value) => {
    setEditingField(field);
    setUpdatedValue(value || "");
    setPendingApprovalMessage("");
  };

  const handleSave = (field) => {
    if (originalData && updatedValue !== originalData[field]) {
      let updateRequest = { [field]: updatedValue };
      
      if (field === "fullname" || field === "livesin") {
        updateRequest = {
          fullname: updatedValue,
          livesin: field === "fullname" ? userData.livesin : updatedValue,
        };
        setPendingApprovalMessage(
          `تم إرسال طلب تعديل الاسم الكامل و المسكن. يرجى الانتظار حتى يوافق المسؤول.`
        );
        setEditingField(null);
      }

      axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/api/edits/addeditrequest`,
          updateRequest,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        )
        .then((res) => {
          setUserData((prevUserData) => ({ ...prevUserData, ...updateRequest }));
          setOriginalData((prevOriginalData) => ({ ...prevOriginalData, ...updateRequest }));
          setEditingField(null);
        })
        .catch((err) => {
          console.error("Error updating user data", err);
        });
    } else {
      setEditingField(null);
    }
  };

  if (!userData) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6">
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg mt-10 cursor-pointer"
            src={`${import.meta.env.VITE_BASE_URL}${userData.profilepicture}`}
            alt={userData.fullname}
            onClick={() => setShowImageModal(true)}
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {userData.fullname}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userData.jobtitle} | {userData.livesin}
          </span>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-8">
            {Object.keys(fieldLabels).map((field) => (
              <div
                key={field}
                className="flex items-center justify-between py-2 px-3 rounded-xl bg-sky-500 mx-1 mt-3 w-full"
              >
                {editingField === field ? (
                  field === "status" ? (
                    <select
                      className="text-black px-2 py-1 rounded-md w-full"
                      value={updatedValue || userData.status || ""}
                      onChange={(e) => setUpdatedValue(e.target.value)}
                    >
                      <option value="">اختر الحالة</option>
                      <option value="يعمل">يعمل</option>
                      <option value="لا يعمل">لا يعمل</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="text-black px-2 py-1 rounded-md w-full"
                      value={updatedValue}
                      onChange={(e) => setUpdatedValue(e.target.value)}
                    />
                  )
                ) : (
                  <p className="text-white w-full">
                    <span className="font-bold"> {fieldLabels[field]} : </span>
                    {userData[field] || "غير متوفر"}
                  </p>
                )}
                {editingField === field ? (
                  <button onClick={() => handleSave(field)} className="ml-2 text-green-500">
                    <FaSave />
                  </button>
                ) : (
                  <button onClick={() => handleEdit(field, userData[field])} className="ml-2 text-yellow-500">
                    <FaEdit />
                  </button>
                )}
              </div>
            ))}
          </div>

          {pendingApprovalMessage && (
            <div className="mt-4 p-3 bg-yellow-200 text-yellow-800 rounded-md">
              {pendingApprovalMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserData;
