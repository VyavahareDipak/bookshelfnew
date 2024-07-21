import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    user: `${JSON.parse(localStorage.getItem("user"))._id}`,
    name: "",
    image: "",
    price: "",
    location: "",
    description: ""
  });

  function changeHandler(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function imageHandler(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgData = e.target.result;
        setFormData((prev) => ({
          ...prev,
          image: imgData,
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/add/post', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `${JSON.parse(localStorage.getItem('token'))}`
        },
        body: JSON.stringify(FormData),
      });
      if (res.ok) {
        toast.success("Post is live now..");
        navigate('/');
      } else {
        toast.error("Try after some time");
      }
    } catch (err) {
      console.error("error:", err);
      toast.error("Try after some time");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <label className="block mb-4">
          <span className="text-gray-700">Book Name<sup>*</sup></span>
          <input
            type="text"
            value={FormData.name}
            name="name"
            onChange={changeHandler}
            placeholder="Enter Book Name"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Book Price<sup>*</sup></span>
          <input
            type="text"
            value={FormData.price}
            name="price"
            onChange={changeHandler}
            placeholder="Enter Book Price"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Location<sup>*</sup></span>
          <input
            type="text"
            value={FormData.location}
            name="location"
            onChange={changeHandler}
            placeholder="Enter Location"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Book Description<sup>*</sup></span>
          <textarea
            value={FormData.description}
            name="description"
            onChange={changeHandler}
            placeholder="Enter Book Description"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Book Image<sup>*</sup></span>
          <input
            type="file"
            accept="image/*"
            placeholder="Add Image"
            name="image"
            required
            onChange={imageHandler}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </label>
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostForm;
