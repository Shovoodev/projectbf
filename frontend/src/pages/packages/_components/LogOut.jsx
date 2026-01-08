import React from "react";

import { useNavigate } from "react-router-dom";
import CORE from "../../../components/common/Reusables";
const LogOut = () => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    await fetch(`${CORE}/logout`, {
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
