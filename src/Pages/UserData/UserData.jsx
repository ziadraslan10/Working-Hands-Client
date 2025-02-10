/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaSave } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { CiBarcode } from "react-icons/ci";

function UserData() {
  const [userData, setUserData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [updatedValue, setUpdatedValue] = useState("");
  const [pendingApprovalMessage, setPendingApprovalMessage] = useState("");
  const [labels, setLabels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/users/getme`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        setUserData(res.data.user);
        setOriginalData(res.data.user);
      })
      .catch((err) => console.error("Error fetching user data", err));

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/label`)
      .then((res) => setLabels(res.data.labels))
      .catch((err) => console.error("Error fetching labels", err));
  }, []);

  const fieldLabels = {
    fullname: "اسم المستخدم :",
    email: "البريد الالكتروني :",
    phonenumber: "رقم الهاتف :",
    birthdate: "تاريخ الميلاد :",
    jobtitle: labels.length > 0 ? labels[0].label + " : " : "المسمى الوظيفي :",
    livesin: "السكن :",
    height: labels.length > 0 ? labels[1].label + " : " : "الطول :",
    status: "الحالة :",
    privatenumber: "الرقم الخاص :",
    brothernumber: " ",
    fathernumber: null,
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
        setPendingApprovalMessage(`تم إرسال طلب .... يرجي الانتظار`);
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
          setUserData((prevUserData) => ({
            ...prevUserData,
            ...updateRequest,
          }));
          setOriginalData((prevOriginalData) => ({
            ...prevOriginalData,
            ...updateRequest,
          }));
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
    <div className="flex min-h-screen lg:px-10">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-end">
          <Link
            to={"/generateqr"}
            className="bg-sky-500 text-white px-3 py-3 rounded-lg"
          >
            <CiBarcode />
          </Link>
        </div>

        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full shadow-md cursor-pointer"
            src={`${import.meta.env.VITE_BASE_URL}${userData.profilepicture}`}
            alt={userData.fullname}
            onClick={() => setIsModalOpen(true)}
          />
          <h2 className="text-xl font-semibold mt-4">{userData.fullname}</h2>
          <p className="text-gray-500">{userData.jobtitle}</p>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {Object.keys(fieldLabels).map((field) => (
            <div key={field} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
              {editingField === field ? (
                field === "status" ? (
                  <select
                    className="px-2 py-1 rounded-md w-full"
                    value={updatedValue || userData.status || ""}
                    onChange={(e) => setUpdatedValue(e.target.value)}
                  >
                    <option value="">اختر الحالة</option>
                    <option value={labels.length > 0 ? labels[2].label : "يعمل"}>
                      {labels.length > 0 ? labels[2].label : "يعمل"}
                    </option>
                    <option value={labels.length > 0 ? labels[3].label : "لا يعمل"}>
                      {labels.length > 0 ? labels[3].label : "لا يعمل"}
                    </option>
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
                <p className="text-black w-full">
                  <span className="font-bold text-gray-500">{fieldLabels[field]}</span>
                  {field === "status" ? (
                    userData[field] === "يعمل" ? (
                      <span className="text-green-700">{userData[field]}</span>
                    ) : (
                      <span className="text-red-600">{userData[field]}</span>
                    )
                  ) : (
                    <>
                      {field === "birthdate"
                        ? new Date(userData[field]).toLocaleDateString("ar-EG")
                        : userData[field] || "غير متوفر"}
                    </>
                  )}
                </p>
              )}
              {editingField === field ? (
                <button onClick={() => handleSave(field)} className="ml-2 text-green-500">
                  <FaSave />
                </button>
              ) : (
                <button onClick={() => handleEdit(field, userData[field])} className="ml-2 text-blue-500">
                  <FaEdit />
                </button>
              )}
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="relative">
              <img
                className="max-w-full max-h-[90vh] rounded-lg"
                src={`${import.meta.env.VITE_BASE_URL}${userData.profilepicture}`}
                alt={userData.fullname}
                onClick={(e) => e.stopPropagation()}
              />
              <button
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                onClick={() => setIsModalOpen(false)}
              >
                ✖
              </button>
            </div>
          </div>
        )}

        {pendingApprovalMessage && (
          <div className="mt-4 p-3 bg-yellow-200 text-yellow-800 text-center rounded-md">
            {pendingApprovalMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserData;