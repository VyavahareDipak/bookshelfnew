import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function LoginForm() {
    const navigate = useNavigate();
    const { setIslogin, setUser } = useContext(AppContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    async function submitHandler(event) {
        event.preventDefault();
        const result = await fetch("/api/v1/islogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        const data = await result.json();
        if (data.success === true) {
            setIslogin(true);
            navigate('/');
            toast.success("Logged in successfully");
            localStorage.setItem("user", JSON.stringify(data.data.user));
            localStorage.setItem("token", JSON.stringify(data.data.token));
            setUser(localStorage.getItem("user"));
        } else {
            toast.error("Enter valid details");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <form onSubmit={submitHandler} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
                <label className="block mb-4">
                    <span className="text-gray-700">Email Address<sup className="text-red-500">*</sup></span>
                    <input 
                        type="email" 
                        value={formData.email} 
                        name="email"
                        onChange={changeHandler}
                        placeholder="Enter email"
                        className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </label>
                <label className="block mb-6 relative">
                    <span className="text-gray-700">Password<sup className="text-red-500">*</sup></span>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        value={formData.password} 
                        name="password"
                        onChange={changeHandler}
                        placeholder="Enter password"
                        className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <span 
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute right-3 top-10 cursor-pointer text-gray-600"
                    >
                        {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
                    </span>
                    <Link className="text-blue-500 text-sm mt-2 block text-right hover:underline" to="#">
                        Forgot password?
                    </Link>
                </label>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
                >
                    Sign in
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
