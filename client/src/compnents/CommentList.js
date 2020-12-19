import React, {useEffect, useState} from "react";
import axios from "axios";
const CommentList = ({postId}) => {
  const [comments, setComments] = useState([]);
  useEffect(async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    console.log("dsadsa", postId);
    setComments(res.data);
  }, []);
  const renederComments = comments.map((comment) => {
    return (
      <div>
        {console.log("Dasdsa", comment.id)}
        <li style={{margin: "15px", listStyleType: "none"}}>
          {comment.content}
        </li>
      </div>
    );
  });
  return <div> {renederComments}</div>;
};

export default CommentList;
