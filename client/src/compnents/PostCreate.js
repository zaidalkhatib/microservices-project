import React, {useState} from "react";
const axios = require("axios");

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const handleClick = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/posts", {title});
    setTitle("");
  };
  const handleChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  return (
    <div>
      <h3> Create Your Post</h3>
      <form>
        <div className="form-group mt-3">
          <label>Enter Your Post</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <button onClick={handleClick} type="Post" className="btn btn-primary">
            Submit
          </button>
          <input
            type="file"
            className="btn"
            id="customFile"
            onChange={handleChange}
            // value={photo}
          />
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
