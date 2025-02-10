import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { RiImageEditLine } from "react-icons/ri";
const ScanQRCode = () => {
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: 250,
      fps: 10,
    });

    scanner.render(
      async (decodedText) => {
        scanner.clear();
        setLoading(true);
        setError("");

        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/users/get-user/${decodedText}`
          );
          setScannedData(response.data.user);
        } catch (err) {
          setError("رمز QR غير صالح أو انتهت صلاحيته");
        } finally {
          setLoading(false);
        }
      },
      () => setError("فشل مسح رمز QR، يرجى المحاولة مرة أخرى.")
    );

    return () => scanner.clear();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">مسح رمز QR</h2>

        <div id="reader" className="mb-4"></div>

        {loading && <p className="text-blue-600">جاري التحميل...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {scannedData && (
          <div className="mt-6 p-4 bg-sky-500 border text-white border-gray-200 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <img
                src={`${import.meta.env.VITE_BASE_URL}${
                  scannedData.profilepicture
                }`}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-blue-500"
              />
              <div className="text-right flex-grow">
                <h2 className="text-lg font-semibold text-white">
                  {scannedData.fullname}
                </h2>
                <p className="text-gray-700 text-sm">{scannedData.status}</p>
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
                {new Date(scannedData.birthdate).toLocaleDateString("ar-EG")}
              </p>
              <p className="flex items-center">
                <FaHome className="ml-2" />
                <span className="font-semibold mr-1">يسكن في:</span>
                {scannedData.livesin}
              </p>
              <p className="flex items-center">
                <IoIosPhonePortrait className="ml-2" />
                <span className="font-semibold mr-1">الوظيفة:</span>
                {scannedData.jobtitle}
              </p>
              <p className="flex items-center">
                <RiImageEditLine className="ml-2" />
                <span className="font-semibold mr-1">الطول:</span>
                {scannedData.height} سم
              </p>
              <p className="flex items-center">
                <FaPhone className="ml-2" />
                <span className="font-semibold mr-1">الرقم الخاص:</span>
                {scannedData.privatenumber}
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
                {scannedData.phonenumber}
              </p>
              <p className="flex items-center">
                <FaPhone className="ml-2" />
                <span className="font-semibold mr-1">رقم الأب:</span>
                {scannedData.fathernumber || "لم يتم اضافه رقم"}
              </p>
              <p className="flex items-center">
                <FaPhone className="ml-2" />
                <span className="font-semibold mr-1">رقم الأخ:</span>
                {scannedData.brothernumber || "لم يتم اضافه رقم"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanQRCode;
