import React, {useState} from "react";
import axios from "axios";
function CommentCreate({postId}) {
  const [content, setContenet] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(content);
    console.log(postId, "hrere");
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });
    setContenet("");
  };
  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            id="autoSizingInput"
            placeholder="Comment"
            value={content}
            onChange={(e) => setContenet(e.target.value)}
            style={{width: "300px"}}
          />
          <div style={{paddingTop: "10px"}}>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CommentCreate;
