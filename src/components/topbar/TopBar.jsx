import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import Swal from "sweetalert2";
import {
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo-2.png";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "سيتم تسجيل خروجك!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، سجل الخروج",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "LOGOUT" });
        Swal.fire({
          icon: "success",
          title: "تم تسجيل الخروج بنجاح!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
      <div className="container">
        <div className="d-flex justify-content-end">
          <Link className="nav-link" to="#" aria-label="فيسبوك">
            <FaFacebook size={20} className="social-icon" />
          </Link>
          <Link className="nav-link" to="#" aria-label="تويتر">
            <FaTwitter size={20} className="social-icon" />
          </Link>
          <Link className="nav-link" to="#" aria-label="إنستغرام">
            <FaInstagram size={20} className="social-icon" />
          </Link>
        </div>

        <div className="logo-container">
          <Link className="navbar-brand text-center mx-auto" to="/">
            <img className="logo-img" src={logo} alt="logo" />
          </Link>
        </div>

        <div className="d-flex justify-content-start">
          <ul className="navbar-nav">
            <li className="nav-item">
              {user ? (
                <button
                  className="nav-link btn logout-btn"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> تسجيل الخروج
                </button>
              ) : (
                <>
                  <Link className="nav-link" to="/login">
                    <FaSignInAlt /> تسجيل الدخول
                  </Link>
                  <Link className="nav-link" to="/register">
                    <FaUser /> تسجيل جديد
                  </Link>
                </>
              )}
            </li>
            {user && (
              <Link to="settings" className="nav-item">
                <span className="nav-link d-flex align-items-center">
                  مرحباً, {user.username}
                </span>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
