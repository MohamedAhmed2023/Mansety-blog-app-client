import "./post.css";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

export default function Post({ post }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const url = `${apiUrl}/images/`;

  const cleanText = (text) => {
    return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="post">
      {post.photo && <img className="postImg" src={url + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c, index) => (
            <span className="postCat" key={index}>
              {c.name}
            </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">{formatDate(post.createdAt)}</span>
      </div>
      <p
        className="postDesc"
        dangerouslySetInnerHTML={{ __html: cleanText(post.desc) }}
      />
    </div>
  );
}
