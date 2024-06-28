import React from "react";
import Template from "../components/Template";
import  image from '../assets/login.jpg'
function SendPost(){
    return(
        <Template
        title="'A reader lives a thousand lives before he dies. The man who never reads lives only one.' - George R.R. Martin"
         discription1="Build skills for today tomarrow, and beyond"
         discription2="Education to future-proof your career"
         image={image}
         formtype="post"
        ></Template>
    )
}

export default SendPost ;