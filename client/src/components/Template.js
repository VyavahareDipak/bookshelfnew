import React from "react";
import LoginForm   from "./loginForm";
import SignupForm   from "./SignupForm";
import PostForm from "./PostForm";
import  background from '../assets/background.jpg'
import { FcGoogle } from "react-icons/fc";

function Template({title,discription1,discription2,image,formtype,setLogin}){
    return (
        <div className="template">
            <div className="form-div">
                <h1>{title}</h1>
                <p>
                    <span className="desc1">{discription1}</span><br/>
                    <span className="desc2">{discription2}</span>
                </p>
                { 
                    formtype==="signup" &&
                    (<SignupForm setLogin={setLogin}/>)
                   
                }
                {
                    formtype ==="login" &&
                    (<LoginForm setLogin={setLogin}/>)
                }
                {
                    formtype ==="post" &&
                    (<PostForm />)
                }
                <div className="or-div">
                    <div className="line"></div>
                    <p className="or-text">OR</p>
                    <div className="line"></div>
                </div>
                <button className="lgin-with-google-btn">
                    <FcGoogle />
                    <p>Sign Up with Google</p>
                </button>
            </div>
            <div className="img-div">
                <img className="img2" src={background} alt="frame" width={558} height={504}/>
                <img className="img1" src={image} alt="frame" width={558} height={504}/>
            </div>
        </div>
    )
}

export default Template ;