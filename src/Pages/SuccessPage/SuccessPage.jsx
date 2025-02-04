/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <>
      <h1 className="text-center font-bold text-3xl">تم بنجاح!</h1>
      <div className="text-center mt-14">
        <p>شكراً لتسجيلك في مكتبة الأيدي العاملة</p>
        <p>
          عزيزي المستخدم, شكراً لك علي إكمال عملية التسجيل نود إعلامك بأن ملفك
          الشخصي قيد المراجعة من قبل فريقنا للتأكد من صحة البيانات المتقدمة.{" "}
        </p>
        <p>هذه العملية تستغرق عادة 24-48 ساعة.</p>
        <p>
          بمجرد الموافقه علي ملفك الشخصي, ستتمكن من الاستفادة من جميع خدماتنا.
        </p>
        <p>شكرا لثقتك بنا</p>
        <p>فريق مكتبة الأيدي العاملة</p>
      </div>
      <div className="flex justify-center my-10 ">
        <Link
          to="/code"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          تحقيق يدوي
        </Link>
      </div>{" "}
    </>
  );
}

export default SuccessPage;
