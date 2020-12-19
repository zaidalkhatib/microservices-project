import React from "react";
import PostCreate from "./compnents/PostCreate";
import PostList from "./compnents/PostList";

function App() {
  return (
    <div className="container">
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
}

export default App;
