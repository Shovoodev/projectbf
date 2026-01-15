/* eslint-disable no-undef */
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router";

import Input from "../components/common/Input";
// import InvoicePDF from "./packages/_components/InvoicePdf";
const CORE = import.meta.env.VITE_API_URL;

const Registration = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const stationery = searchParams.get("stationery");
  const bodypreparation = searchParams.get("bodypreparation");
  const coffin = searchParams.get("coffin");
  const flowers = searchParams.get("flowers");
  const urn = searchParams.get("urn");
  const collectionOfUrn = searchParams.get("collectionOfUrn");
  const { userid } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      stationery,
      bodypreparation,
      coffin,
      flowers,
      urn,
      collectionOfUrn,
    };
    const res = await fetch(`${CORE}/blacktulipauth/newuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) return alert("Failed to register new user");
    await fetch(`${CORE}/newattendingservicecremationanswers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload,
      }),
    });

    navigate(`/${userid}/fill-agreement-form`);
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
          <button
            className="ml-5 text-lgpy-2 px-4 py-1 rounded-md hover:bg-blue-600  bg-blue-500 text-white"
            onClick={() => {
              navigate(
                `/login?stationery=${stationery}&bodypreparation=${bodypreparation}&coffin=${coffin}&flowers=${flowers}&urn=${urn}&collectionOfUrn=${collectionOfUrn}`
              );
            }}
          >
            LogIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
