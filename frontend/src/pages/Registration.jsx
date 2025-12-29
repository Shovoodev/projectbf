import { useState } from "react";
import { NavLink } from "react-router";
import Input from "../components/common/Input";
import CORE from "../components/common/Reusables";

const Registrarion = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${CORE}/blacktulipauth/newuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1> Please Register to compete the procedure</h1>
        <form onSubmit={handleSubmit} className="w-full pb-2">
          <Input
            type="email"
            label="Enter Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Input
            type="password"
            label="Enter Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button
            className="w-[50%] ml-[25%] mt-4 bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600  "
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className=" flex-initial">
          already have an account{" "}
          <NavLink
            className="ml-5 text-lgpy-2 px-4 py-1 rounded-md hover:bg-blue-600  bg-blue-500 text-white"
            to="/login"
          >
            LogIn
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Registrarion;
