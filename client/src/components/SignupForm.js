import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    c_password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.c_password) {
      toast.error("Password and confirm password should be the same");
    } else {
      const result = await fetch("api/v1/add/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await result.json();
      if (data.success) {
        toast.success("Successfully signed up");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <form onSubmit={submitHandler} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            First Name<sup className="text-red-500">*</sup>
            <input
              type="text"
              placeholder="Enter Name"
              value={formData.name}
              name="name"
              onChange={changeHandler}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Email<sup className="text-red-500">*</sup>
            <input
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              name="email"
              onChange={changeHandler}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-2">
            Password<sup className="text-red-500">*</sup>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={formData.password}
              name="password"
              onChange={changeHandler}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
            </span>
          </label>
        </div>
        <div className="mb-6 relative">
          <label className="block text-gray-700 mb-2">
            Confirm Password<sup className="text-red-500">*</sup>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={formData.c_password}
              name="c_password"
              onChange={changeHandler}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
