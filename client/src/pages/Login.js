import React from "react";
import Template from '../components/Template'
import  image from '../assets/login.jpg'
function Login({setLogin}){
    
    return(
         <Template
         title="Welcome Back"
         discription1="Build skills for today tomarrow, and beyond"
         discription2="Education to future-proof your career"
         image={image}
         formtype="login"
         setLogin={setLogin}
         />
    )
}

export default Login ;