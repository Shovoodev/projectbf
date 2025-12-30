import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import { useUser } from "../components/hooks/useUser";
import CORE from "../components/common/Reusables";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { user } = useUser();

  const handleSubmit = async (e) => {
    await e.preventDefault();
    console.log(userData);
    setIsLoading(true);
    await fetch(`${CORE}/blacktulipauth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data._id) {
          navigate(`/${user._id}/packages/basic`);
          localStorage.setItem("user", JSON.stringify(data));
        }
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      {isLoading ? (
        "loading"
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              label="Enter email"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <Input
              type="password"
              label="Enter Password"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <div className=" flex">
              <button
                className="w-[50%] ml-[25%] mt-4 bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600  "
                type="submit"
              >
                SignUp
              </button>
              <button
                className="w-[50%] ml-[25%] mt-4 bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600  "
                type="submit"
              >
                SignIn
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;
