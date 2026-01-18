import React from "react";
import Sidebar from "./_component/Sidebar";
import Dashboard from "./_component/Dashboard";

const UserPage = () => {
  return (
    <div className=" flex bg-white min-h-screen pb-20 ">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default UserPage;
