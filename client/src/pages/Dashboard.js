import React, { useContext, useEffect, useState } from "react";
import Card from '../components/Card'
import toast from "react-hot-toast";

// import { useDispatch, useSelector } from "react-redux";
// import { update } from "../redux/slices/searchSlice";
import { AppContext } from "../context/AppContext";
function DashBoard(){
  const {posts,setPosts,allPosts,fetchData,user} = useContext(AppContext)
    const [Filter,setFilter] = useState({minprice:0,maxprice:0});
   
    function stremHandler(e){
        setFilter((prev)=>({
            ...prev,
            [e.target.name]:e.target.value,
        }))
        console.log(Filter)
    }
    function FilterHandler(){
        if(Filter.minprice <=0 || Filter.minprice>Filter.maxprice || Filter.maxprice===0) {
            return toast.error("enter valid price range");
        }
        setPosts(()=>{
            console.log(allPosts);
            return allPosts.filter((post)=>{ 
                return post.price>=Filter.minprice && post.price<=Filter.maxprice})
        }) 
    }
    function clearFilter(){
        setPosts(allPosts);
        setFilter({minprice:"",maxprice:""})
    }
    
    
    useEffect(()=>{
        fetchData();
        // console.log(user._id) ;
        // eslint-disable-next-line
    },[]);


    return(
        <div className="filter-dashboard">
        <div className="Filter-container">
             
                <p>min :</p>
                <input
                name="minprice"
                type="number"
                value={Filter.minprice}
                placeholder="min"
                onChange={stremHandler}>
                </input>
                <p>max :</p>
                <input
                name="maxprice"
                type="number"
                value={Filter.maxprice}
                placeholder="max"
                onChange={stremHandler}>
                </input>
                <br></br>
                <button onClick={FilterHandler} className="nav-btn">Apply</button>
                <button onClick={clearFilter}  className="nav-btn">Clear</button>
            </div>
         
        <div className="dashboard">
           {
            false?(<p>Loading</p>):(
                
                posts.length<=0?(<p>Data Not Found</p>):(       
                    posts.map((post)=>{
                        
                        return <Card post={post} key={post._id}/>})
                )
            )
           }
        </div>
       
        </div>
    )
}

export default DashBoard ;