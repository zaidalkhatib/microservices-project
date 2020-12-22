import React from "react";
const CommentList = ({comments}) => {
  const renederComments = comments.map((comment, index) => {
    let answer = "";
    if (comment.status === "rejected") {
      answer = "this comment has been rejected";
    }
    if (comment.status === "approved") {
      answer = comment.content;
    }
    if (comment.status === "pending") {
      answer = "ths comment is pending";
    }
    return (
      <div>
        <li key={comment.id} style={{margin: "15px", listStyleType: "none"}}>
          {answer}
          <hr />
        </li>
      </div>
    );
  });
  return <div> {renederComments}</div>;
};

export default CommentList;
