import { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({ adminEmail: "", password: "" });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        await e.preventDefault();
        console.log(userData);
        setIsLoading(true);
        await fetch("http://localhost:4000/adminstration-btf/login", {
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
                    navigate("/");
                    localStorage.setItem("user", JSON.stringify(data));
                }
            });
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {isLoading ? (
                < > <div>loading</div> </>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Log In </h2>
                    <form onSubmit={handleSubmit} >
                        <div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    label="Enter email"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"

                                    onChange={(e) =>
                                        setUserData({ ...userData, adminEmail: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Email Password
                                </label>
                                <input
                                    type="password"
                                    label="Enter Password"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"

                                    onChange={(e) =>
                                        setUserData({ ...userData, password: e.target.value })
                                    }
                                />
                            </div>
                        </div>


                        <button
                            className="w-[50%] ml-[25%] mt-4 bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600  "
                            type="submit"
                        >
                            SignIn
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SignIn;