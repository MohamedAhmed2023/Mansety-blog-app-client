import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;

  const PF = `${apiUrl}/images/`;
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${apiUrl}/posts/` + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path, apiUrl]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const cleanedDesc = quillRef.current.root.innerHTML
        .replace(/(<p><br><\/p>)+/g, "")
        .trim();

      await axios.put(`${apiUrl}/posts/${post._id}`, {
        username: user.username,
        title,
        desc: cleanedDesc,
      });
      setUpdateMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (updateMode && !quillRef.current) {
      quillRef.current = new Quill("#editor", {
        theme: "snow",
        modules: { toolbar: [["bold", "italic"], ["link"]] },
      });
      quillRef.current.root.innerHTML = desc;
    }
  }, [updateMode, desc]);

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <span
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                >
                  تعديل المقال
                </span>
                <span
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                >
                  حذف المقال
                </span>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            الكاتب الصحفي :
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toLocaleDateString("ar-EG", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        {updateMode ? (
          <div id="editor" className="singlePostDescInput"></div>
        ) : (
          <p
            className="singlePostDesc"
            dangerouslySetInnerHTML={{ __html: desc }}
          ></p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            تحديث المقال
          </button>
        )}
      </div>
    </div>
  );
}
