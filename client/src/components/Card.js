import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { FaLocationDot } from "react-icons/fa6";
import { AppContext } from "../context/AppContext";

function Card({ post }) {
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AppContext);

    async function buyHandler() {
        setLoading(true);
        if (post.user._id === user._id) {
            toast("This is your own post");
            setLoading(false);
            return;
        }
        try {
            const result = await fetch("/api/v1/sendmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender: JSON.parse(localStorage.getItem("user")),
                    post: post,
                }),
            });
            const data = await result.json();
            if (data.success) {
                toast.success("Mail sent to book owner, they will reply soon");
            } else {
                console.log(data.message);
            }
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    async function deleteHandler() {
        try {
            const res = await fetch("/api/v1/remove/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${JSON.parse(localStorage.getItem('token'))}`,
                },
                body: JSON.stringify({
                    user: user._id,
                    post: post._id,
                }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Post deleted successfully");
            }
        } catch (err) {
            toast.error("Try after some time");
            console.log(err);
        }
    }

    return (
        <div className="  ">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center h-60 bg-gray-200 text-gray-600">
                        <span>Sending mail to book owner...</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <img src={post.image} className="h-64  object-fit" alt="book" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">{post.name}</h2>
                            <p className="text-gray-700 mb-4">{post.description}</p>
                            <div className="flex items-center text-gray-500 mb-4">
                                <FaLocationDot className="mr-2" />
                                <span>{post.location}</span>
                            </div>
                            <p className="text-lg font-bold text-gray-900 mb-4">₹ {post.price}</p>
                            <div className="flex justify-between">
                                {user._id !== post.user._id && (
                                    <button
                                        onClick={buyHandler}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150"
                                    >
                                        Buy Now
                                    </button>
                                )}
                                {user._id === post.user._id && (
                                    <button
                                        onClick={deleteHandler}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-150"
                                    >
                                        Delete Post
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card;
