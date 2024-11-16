import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import Swal from "sweetalert2";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      Swal.fire({
        icon: "success",
        title: "تم تسجيل الدخول بنجاح!",
        text: `مرحباً بك، ${res.data.username}!`,
        confirmButtonText: "حسناً",
      });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });

      Swal.fire({
        icon: "error",
        title: "فشل تسجيل الدخول",
        text: "يرجى التحقق من اسم المستخدم أو كلمة المرور.",
        confirmButtonText: "حاول مرة أخرى",
      });
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <span className="loginTitle">تسجيل الدخول</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>اسم المستخدم</label>
          <input
            type="text"
            className="loginInput"
            placeholder="أدخل اسم المستخدم..."
            ref={userRef}
          />
          <label>كلمة المرور</label>
          <input
            type="password"
            className="loginInput"
            placeholder="أدخل كلمة المرور..."
            ref={passwordRef}
          />
          <button className="loginButton" type="submit" disabled={isFetching}>
            تسجيل الدخول
          </button>
          <p className="registerLink">
            ليس لديك حساب؟ <Link to="/register">تسجيل جديد</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
