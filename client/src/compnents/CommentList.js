import React from "react";
const CommentList = ({comments}) => {
  const renederComments = comments.map((comment) => {
    return (
      <div>
        <li key={comment.id} style={{margin: "15px", listStyleType: "none"}}>
          {comment.content}
        </li>
      </div>
    );
  });
  return <div> {renederComments}</div>;
};

export default CommentList;
