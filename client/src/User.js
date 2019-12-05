import React, { useState, useEffect } from "react";
import axios from "axios";

function User() {
  const [posts, setPosts] = useState([]);
  const id = localStorage.getItem("user");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${id}/posts`)
      .then(res => {
        setPosts(res.data);
        console.log("posts", res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div>
      <h1>{posts}</h1>
    </div>
  );
}

export default User;
