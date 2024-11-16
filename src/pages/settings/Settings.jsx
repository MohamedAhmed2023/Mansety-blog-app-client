import "./settings.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import Swal from "sweetalert2";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, dispatch } = useContext(Context);
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    try {
      const res = await axios.patch(`${apiUrl}/users/` + user._id, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      Swal.fire({
        title: "تم التحديث بنجاح!",
        text: "تم تحديث بيانات حسابك.",
        icon: "success",
        confirmButtonText: "حسنًا",
      });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      Swal.fire({
        title: "حدث خطأ",
        text: "لم يتم تحديث الحساب. حاول مجددًا.",
        icon: "error",
        confirmButtonText: "حسنًا",
      });
    }
  };

  const handleStoryClick = () => {
    Swal.fire({
      title: "إضافة مقال",
      text: "هل تريد الانتقال لصفحة إضافة المقال؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/write";
      }
    });
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">حسابي</span>
          <span className="settingsDeleteTitle">حذف الحساب</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <div className="settingsPP">
            <p className="welcome-message">مرحباً {user.username}!</p>{" "}
          </div>
          <label>اسم المستخدم</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>البريد الإلكتروني</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>كلمة المرور</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            تحديث
          </button>
          <button className="addStoryButton" onClick={handleStoryClick}>
            اضف مقالك الان
          </button>
        </form>
      </div>
    </div>
  );
}
