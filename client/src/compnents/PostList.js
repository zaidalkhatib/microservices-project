import React, {useState, useEffect} from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
const PostList = () => {
  const [posts, setPosts] = useState({});
  useEffect(() => {
    displayPosts();
  }, []);
  const displayPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4002/posts");

      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderedValues = Object.values(posts).map((post) => {
    return (
      <div className="container">
        <div
          key={post.id}
          className="card"
          style={{width: "90%", marginBottom: "20px"}}
        >
          <div className="card-body">
            <h3 key={post.id}>{post.title}</h3>
            <CommentList comments={post.comments} />
            <CommentCreate postId={post.id} />
          </div>
        </div>
      </div>
    );
  });
  return <div className="">{renderedValues}</div>;
};

export default PostList;
