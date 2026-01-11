import React, { useEffect, useState } from "react";
const CORE = import.meta.env.VITE_API_URL;

import { FiLoader } from "react-icons/fi";

const UserPage = () => {
  const [services, setServices] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${CORE}/desencepersondetails`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch questions");
        const data = await res.json();
        setServices(data);

        // Initialize formData with empty strings for each question
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  console.log({ services });
  if (loading)
    return (
      <p className="text-white ">
        <FiLoader />
      </p>
    );
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div>
      <h1>This is the user</h1>
    </div>
  );
};

export default UserPage;
