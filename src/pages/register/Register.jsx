import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/auth/register`, {
        username,
        email,
        password,
      });
      if (res.data) {
        Swal.fire({
          icon: "success",
          title: "تم إنشاء الحساب بنجاح!",
          text: "يمكنك الآن تسجيل الدخول.",
          confirmButtonText: "حسناً",
        }).then(() => {
          window.location.replace("/login");
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "حدث خطأ",
        text: "تعذر إنشاء الحساب. حاول مرة أخرى.",
        confirmButtonText: "حسناً",
      });
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <span className="registerTitle">إنشاء حساب</span>
        <form className="registerForm" onSubmit={handleSubmit}>
          <label>اسم المستخدم</label>
          <input
            type="text"
            className="registerInput"
            placeholder="أدخل اسم المستخدم..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>البريد الإلكتروني</label>
          <input
            type="email"
            className="registerInput"
            placeholder="أدخل بريدك الإلكتروني..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>كلمة المرور</label>
          <input
            type="password"
            className="registerInput"
            placeholder="أدخل كلمة المرور..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="registerButton" type="submit">
            إنشاء حساب
          </button>
          <p className="loginLink">
            لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
