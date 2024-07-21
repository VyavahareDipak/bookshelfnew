import React from "react";
import LoginForm from "./loginForm";
import SignupForm from "./SignupForm";
import PostForm from "./PostForm";
import { FcGoogle } from "react-icons/fc";

function Template({ title, description1, description2, formtype, setLogin }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center bg-white p-6 shadow-md rounded-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">{title}</h1>
        <p className="text-gray-600 text-center mb-6">
          <span className="block">{description1}</span>
          <span className="block">{description2}</span>
        </p>
        <div className="w-full">
          {formtype === "signup" && <SignupForm setLogin={setLogin} />}
          {formtype === "login" && <LoginForm setLogin={setLogin} />}
          <div className="w-full">{formtype === "post" && <PostForm />}</div>
        </div>
        <div className="flex items-center my-4 w-full">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <button className="flex items-center justify-center w-full py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-300">
          <FcGoogle className="mr-2" />
          <p>Sign Up with Google</p>
        </button>
      </div>
    </div>
  );
}

export default Template;
