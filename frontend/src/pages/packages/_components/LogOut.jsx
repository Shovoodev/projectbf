import React from "react";

import { useNavigate } from "react-router-dom";
const LogOut = () => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    await fetch(`http://localhost:4000/logout`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => console.log("loged out"))
      .then(() => navigate("/"));
  };
  return (
    <div>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  );
};

export default LogOut;
