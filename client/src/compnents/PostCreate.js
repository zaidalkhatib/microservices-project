import React, {useState} from "react";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
toast.configure();

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [isBad, setIsBad] = useState(false);
  const handleClick = async (e) => {
    e.preventDefault();
    if (title.length > 0) {
      axios.post("http://localhost:4000/posts", {title});
      setTitle("");
    } else {
      notify();
    }
  };
  const notify = () =>
    toast("The Post is Empty, Enter Something!", {type: "error"});
  const handleChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <div>
      <h3> Create Your Post</h3>
      {isBad ? (
        <div class="alert alert-warning" role="alert">
          This Post has Illegal Word/s
        </div>
      ) : null}
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
              if (e.target.value.match("ass")) {
                setIsBad(true);
                setTitle(e.target.value);
              } else {
                setIsBad(false);
                setTitle(e.target.value);
              }
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
