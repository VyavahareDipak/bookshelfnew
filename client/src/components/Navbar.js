import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { IoMdSearch, IoMdMenu, IoMdClose } from "react-icons/io";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { islogin, setIslogin, query, setQuery, setPosts, allPosts, fetchData, user } = useContext(AppContext);

  const logoutHandler = () => {
    setIslogin(false);
    navigate('/login');
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  const queryHandler = (e) => {
    setQuery(e.target.value);
    console.log(query);
  };

  const myPostHandler = async () => {
    setPosts(()=>{
      return (
        allPosts.filter((post)=>{
         return post.user === user._id ;
        })
      )
    })
  };
  const dashbordHandler = async()=>{
    setPosts(()=>{
      return (
        allPosts.filter((post)=>{
         return post.user !== user._id ;
        })
      )
    })
  };
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to='/' className="text-xl font-bold text-gray-800">
        BookShelf.com
      </Link>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <input
            className="border border-gray-300 p-2 rounded-md"
            placeholder="Search"
            value={query}
            onChange={queryHandler}
          />
          <IoMdSearch
            className="text-gray-500 cursor-pointer"
            onClick={() => {
              setPosts(() => allPosts.filter((post) => post.name.toLowerCase().includes(query)));
            }}
          />
        </div>
        {!islogin ? (
          <>
            <Link to='/login'>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
            </Link>
            <Link to='/signup'>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Signup</button>
            </Link>
          </>
        ) : (
          <>
            <button className="bg-blue-500  text-white px-4 py-2 rounded-md" onClick={myPostHandler}>My Posts</button>
            <Link to='/sendPost'>
              <button className="bg-blue-500   text-white px-4 py-2 rounded-md">Sell</button>
            </Link>
            <Link to='/'>
              <button className="bg-blue-500   text-white px-4 py-2 rounded-md" onClick={logoutHandler}>Logout</button>
            </Link>
           
            <button onClick={dashbordHandler}>
              <button className="bg-blue-500  text-white px-4 py-2 rounded-md">Dashboard</button>
            </button>
           
          </>
        )}
      </div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <IoMdClose className="text-gray-800 text-2xl" />
          ) : (
            <IoMdMenu className="text-gray-800 text-2xl" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white shadow-md p-4 z-50 transform transition-transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex items-center justify-between">
          <Link to='/' className="text-xl font-bold text-gray-800">
            BookShelf.com
          </Link>
          <button onClick={() => setIsMenuOpen(false)}>
            <IoMdClose className="text-gray-800 text-2xl" />
          </button>
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex items-center space-x-2 mb-4">
            <input
              className="border border-gray-300 p-2 rounded-md"
              placeholder="Search"
              value={query}
              onChange={queryHandler}
            />
            <IoMdSearch
              className="text-gray-500 cursor-pointer"
              onClick={() => {
                setPosts(() => allPosts.filter((post) => post.name.toLowerCase().includes(query)));
              }}
            />
          </div>
          {!islogin ? (
            <>
              <Link to='/login' onClick={() => setIsMenuOpen(false)}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2">Login</button>
              </Link>
              <Link to='/signup' onClick={() => setIsMenuOpen(false)}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2">Signup</button>
              </Link>
            </>
          ) : (
            <>
              <button className="bg-blue-500 text-white  px-4 py-2 rounded-md mb-2" onClick={() => {
                myPostHandler();
                setIsMenuOpen(false);
              }}>My Posts</button>
              <Link to='/sendPost' onClick={() => setIsMenuOpen(false)}>
                <button className="bg-blue-500 text-white w-full px-4 py-2 rounded-md mb-2">Sell </button>
              </Link>
              <Link to='/' onClick={() => {
                logoutHandler();
                setIsMenuOpen(false);
              }}>
                <button className="bg-blue-500 text-white w-full px-4 py-2 rounded-md mb-2">Logout</button>
              </Link>
              <Link to='/dashboard' onClick={() => setIsMenuOpen(false)}>
                <button className="bg-blue-500 text-white w-full px-4 py-2 rounded-md">Dashboard</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;


