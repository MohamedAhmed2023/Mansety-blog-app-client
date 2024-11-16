import { useContext, useState, useRef, useEffect } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { BiSolidImageAdd } from "react-icons/bi";
import Swal from "sweetalert2";

export default function Write() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const quillRef = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    quillRef.current = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["link", "image", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      },
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc: quillRef.current.root.innerHTML,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post(`${apiUrl}/upload`, data);
      } catch (err) {
        Swal.fire({
          title: "خطأ",
          text: "حدث خطأ أثناء تحميل الصورة. حاول مرة أخرى.",
          icon: "error",
          confirmButtonText: "حسنًا",
        });
        return;
      }
    }

    try {
      const res = await axios.post(`${apiUrl}/posts`, newPost);
      Swal.fire({
        title: "تم النشر!",
        text: "تم نشر المقال بنجاح.",
        icon: "success",
        confirmButtonText: "عرض المقال",
      }).then(() => {
        window.location.replace("/post/" + res.data._id);
      });
    } catch (err) {
      Swal.fire({
        title: "خطأ",
        text: "حدث خطأ أثناء نشر المقال. حاول مرة أخرى.",
        icon: "error",
        confirmButtonText: "حسنًا",
      });
    }
  };

  return (
    <div className="write">
      {file && (
        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt="Preview"
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput" className="fileInput">
            <span>
              <BiSolidImageAdd />
            </span>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="العنوان"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div
          className="writeFormGroup"
          style={{ width: "100%", height: "400px" }}
        >
          <div id="editor" className="writeEditor"></div>
        </div>
        <button className="writeSubmit" type="submit">
          نشر
        </button>
      </form>
    </div>
  );
}
