import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { update } from "../redux/slices/searchSlice";
import { AppContext } from "../context/AppContext";
import { IoMdSearch } from "react-icons/io";

function Navbar(){
   const navigate = useNavigate();
   const {islogin,setIslogin,query,setQuery,setPosts,allPosts,fetchData,user} = useContext(AppContext);
   const [filteredPost,setFilteredPost] = [] ;
    function logoutHandler(){
            setIslogin(false);
            navigate('/login');
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            toast.success("logged out successfully")
    }
    function queryHandler(e){
      setQuery(e.target.value);
      console.log(query);
  }
  async function myPostHandler(){
      setQuery(user._id) ;
      fetchData() ;
  }
    return(
        <div className="navbar">
           <Link to='/' className="title">
           <p >BookShelf.com</p>
           </Link>
           <div className="search-bar-icon" >
            <input
            className="navbar-search"
            placeholder="search"
            value={query}
            onChange={queryHandler}
            >
            </input>
            <IoMdSearch className="search-icon" onClick={()=>{
               setPosts(()=>{
                 return allPosts.filter((post)=>{
                     return post.name.toLowerCase().includes(query) ;
                     console.log(post.name) ;
                  })
               })
            }}/>
            </div>
           <div className="login-btn">
               { !islogin &&
                 <Link to='/login'>
                    <button className="nav-btn">Login</button>
                 </Link>
               }
               { !islogin &&
                 <Link to='/signup'>
                    <button className="nav-btn" >Signup</button>
                 </Link>
               }
               {
                  islogin &&
                     <button className="nav-btn" onClick={myPostHandler}>My Posts</button>
                  
               }
               {
                  islogin &&
                  <Link to ='/sendPost'>
                     <button className="nav-btn" >Sell Book</button>
                  </Link>
               }
               { islogin &&
                 <Link to='/'>
                    <button className="nav-btn" onClick={logoutHandler}>Logout</button>
                 </Link>
               }
               { islogin &&
                 <Link to='/'>
                    <button className="nav-btn">Dashboard</button>
                 </Link>
               }
               
            </div>
        </div>
    )
}

export default Navbar ;