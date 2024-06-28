import React, {  useState } from "react";
import toast from "react-hot-toast";
import { FaLocationDot } from "react-icons/fa6";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
function Card({post}){
    const [loading,setLoading] = useState(false) ;
    const {user} = useContext(AppContext) ; 
    async function  buyHandler(){
        setLoading(true) ;
        if(post.user._id ===user._id){
            toast("this is your own post") ;
            return
        }
        try{
        const result = await fetch("/api/v1/sendmail",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                // "authorization":`${localStorage.getItem("token")}`
            },
            body:JSON.stringify({
                sender:JSON.parse(localStorage.getItem("user")),
                post:post,
            })
        })
        const data = await result.json();
        if(data.success===true){
            toast.success("mail send to book owner ,they will reply soon");
            console.log(data.message) ;
        }else{
            console.log(data.message) ;
           
        }
    }catch(err){
        console.log(err) ;
    }  
    setLoading(false) ;         
    }
    async function deleteHandler(){
        console.log(typeof user._id)
        console.log(typeof post._id)
        try{
            const res = await fetch("/api/v1/remove/post",{
                method:"POST",
                headers:{
                    "content-type":"Application/json",
            
                    'authorization':`${JSON.parse(localStorage.getItem('token'))}`

                },
                body:JSON.stringify({
                    user : (user._id) ,
                    post : (post._id)
                })
            })
            console.log(res) ;
            const data =await res.json() ;
            if(data.success=="true"){
                toast.success("post deleted successfully") ;
                return ;
            }
        }catch(err){
            toast.error("try after some time") ;
            console.log(err) ;
        
        }
    }
    return(
        <div>
            { loading &&
               <dip className="card">Sending mail to book owner</dip>
            }
       {!loading && 
        <div className="card">
            <img src={`${post.image}`} className="card-img" alt="book img"></img>
            <div className="card-text">
                <p className="card-name">{post.name}</p>
                <div className="description">{post.description}</div>
                <div className="location"><FaLocationDot /> {post.location}</div>
                <p className="card-price">₹ {post.price}</p>
                {user._id!==post.user &&
                    <button onClick={buyHandler} className="card-btn">buy Now</button>
                }
                {user._id===post.user &&
                    <button onClick={deleteHandler} className="card-btn">Delete Post</button>
                }
            </div>

        </div>
        }
        </div>
    )
}

export default Card ;