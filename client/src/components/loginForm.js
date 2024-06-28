import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function LoginForm(){
    const navigate = useNavigate();
    const {setIslogin,setUser}  = useContext(AppContext) ;
    const [formData,setFormData] = useState({email:"",password:""})
    const [showPassword,setShowPassword] = useState(false) ;
    function changeHandler(event){
         setFormData((prev)=>{
            return(
                {
                    ...prev,
                    [event.target.name]:event.target.value 
                }
            )
         })
    }

    async function submitHandler(event){
            event.preventDefault();
            const result = await fetch("/api/v1/islogin",{
             method:"POST",
             headers:{
                "Content-Type":"application/json"
             },
             body:JSON.stringify(formData)
            })
            const data =await result.json();
            if(data.success===true){
                setIslogin(true) ;
               
                navigate('/') ;
                toast.success("logged in successfully");
                console.log(data);
                localStorage.setItem("user",JSON.stringify(data.data.user));
                localStorage.setItem("token",JSON.stringify(data.data.token));
                setUser(localStorage.getItem("user")) ;
            }else{
                toast.error("enter valid details");
            }
           
    }
    return(
        <div>
          <form onSubmit={submitHandler} className="login-form">
            <label>
                <p>Email Address<sup>*</sup></p>
            <input 
            type="email" 
            value={formData.email} 
            name ="email"
            onChange={changeHandler}
            placeholder="Enter email id"
            required></input>
            </label>
            <label  className="password-div">
                <p>Password<sup>*</sup></p>
            <input 
            type={showPassword?("text"):("password")}
            value={formData.password} 
            name ="password"
            onChange={changeHandler}
            placeholder="Enter Password"
            required></input>
            <span onClick={()=>{
                setShowPassword((prev)=>!prev)
            }}>
                {
                    showPassword?(<FaRegEyeSlash />):(<MdOutlineRemoveRedEye />) 
                }
            </span>
                <Link className="forgot-password" to="#"><p>forgot password ?</p></Link>
            </label>

            <button className="signin-btn">Sign in</button>
          </form>
        </div>
    )
}

export default LoginForm ;