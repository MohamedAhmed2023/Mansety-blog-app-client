import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${apiUrl}/posts` + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search, apiUrl]);
  return (
    <>
      <Header />
      <div className="home-header">
        <h3 className="heading-home">تصفح جميع المقالات</h3>
      </div>

      <div className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
}
