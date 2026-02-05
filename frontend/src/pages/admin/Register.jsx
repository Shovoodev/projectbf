import { useState } from "react";
import { NavLink } from "react-router-dom";


const Register = () => {
    const [data, setData] = useState({ adminEmail: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:4000/add-btf-admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form onSubmit={handleSubmit} className="w-full pb-2">
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
                                    setData({ ...data, adminEmail: e.target.value })
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
                                    setData({ ...data, password: e.target.value })
                                } data
                            />
                        </div>
                    </div>
                    <button
                        className="w-[50%] ml-[25%] mt-4 bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600  "
                        type="submit"
                    >
                        Submit
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Register;