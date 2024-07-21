import React, { useContext, useEffect, useState } from "react";
import Card from '../components/Card'
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

function DashBoard() {
    const { posts, setPosts, allPosts, fetchData, user } = useContext(AppContext);
    const [filter, setFilter] = useState({ minprice: 0, maxprice: 0 });

    function streamHandler(e) {
        setFilter((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    function filterHandler() {
        if (filter.minprice <= 0 || filter.minprice > filter.maxprice || filter.maxprice === 0) {
            return toast.error("Enter a valid price range");
        }
        setPosts(() => {
            return allPosts.filter((post) => post.price >= filter.minprice && post.price <= filter.maxprice);
        });
    }

    function clearFilter() {
        setPosts(allPosts);
        setFilter({ minprice: "", maxprice: "" });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-4 md:p-8 lg:p-12">
            <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="mb-2 md:mb-0">
                            <label className="block text-gray-700">Min Price:</label>
                            <input
                                name="minprice"
                                type="number"
                                value={filter.minprice}
                                placeholder="Min"
                                onChange={streamHandler}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full md:w-32"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Max Price:</label>
                            <input
                                name="maxprice"
                                type="number"
                                value={filter.maxprice}
                                placeholder="Max"
                                onChange={streamHandler}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full md:w-32"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-2 mt-4 md:mt-0">
                        <button
                            onClick={filterHandler}
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                        >
                            Apply
                        </button>
                        <button
                            onClick={clearFilter}
                            className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {posts.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">Data Not Found</p>
                ) : (
                    posts.map((post) => (
                        <Card post={post} key={post._id} />
                    ))
                )}
            </div>
        </div>
    );
}

export default DashBoard;
