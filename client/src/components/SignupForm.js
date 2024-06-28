import {  useState } from "react"
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

let passwordfield = false ;
let conformfield = false ;
function SignupForm(){

    // const [AccountType,setAccountType]=useState("student")
    const [formData,setFormData] = useState({name:"",email:"", password:"", c_password:""})
    const [showPassword,setShowPassword]=useState(false)
   
    // useEffect(()=>{
    //     console.log(passwordfield) ;
    // })
    const navigate = useNavigate() ;

    function changeHandler(event){
        setFormData((prev)=>{
           return(
               {
                   ...prev,
                   [event.target.name]:event.target.value 
               }
           )
        })
        console.log(formData);
   }

   async function submitHandler(event){
     event.preventDefault() ;
     if(formData.password!==formData.c_password){
        toast.error("password and conform password whould be same")
     }
     else{
        // navigate('/dashboard');
        //----------------------to add user type--------------------------
        // setFormData(() => {
        //     const updatedFormData = {
        //       ...formData,
        //       AccountType: `${AccountType}`
        //     };
        //     console.log(updatedFormData); // Check if AccountType is added here
        //     return updatedFormData;
        //   });
        //   console.log(formData);
         //-------------------------------------------------------------------------------
         
         const result = await fetch("api/v1/add/user",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
         });
         const data =await result.json();
         if(data.success===true){
            toast.success("successfully sign up");
            navigate("/login");
            console.log(data.data);
         }
         else{
            toast.error(data.message);
         }
     } 
   }

    return(
       <div>
        {/* <div className="student-instr-btn">
            <button className= {`${AccountType=="student" ?"student":"no-click"}`} onClick={()=>{setAccountType("student")}}>Student</button>
            <button className={`${AccountType=="instructor" ?"student":"no-click"}`} onClick={()=>{setAccountType("instructor")}}>Instructor</button>
        </div> */}

        <form onSubmit={submitHandler} className="login-form">
            {/* names */}
            <div className="signup-name">
                <label>
                    <p>First name<sup>*</sup></p>
                    <input
                    type="text"
                    placeholder="Enter Name"
                    value={formData.name}
                    name="name"
                    onChange={changeHandler}
                    required
                    />
                </label>
            </div>
            <label>
                <p>email<sup>*</sup></p>
                <input
                type="email"
                placeholder="Enter email"
                value={formData.email}
                name="email"
                onChange={changeHandler}
                required
                />
            </label>
            {/* password */}
            <div className="signup-name">

                <label className="password-div">
                    <p>password<sup>*</sup></p>
                    <input
                    type={showPassword ?("text"):("password")}
                    placeholder="Enter Password"
                    value={formData.password}
                    name="password"
                    onChange={changeHandler}
                    required
                    />
                    <span onClick={()=>{
                        passwordfield = !passwordfield ;
                        setShowPassword((prev)=>!prev);
                            
                    }}>
                        {showPassword ?(<FaRegEyeSlash />):(<MdOutlineRemoveRedEye />)}
                    </span>
                </label>
                <label className="password-div">
                    <p>conform password<sup>*</sup></p>
                    <input
                    type={showPassword ?("text"):("password")}
                    placeholder="Enter Password"
                    value={formData.c_password}
                    name="c_password"
                    onChange={changeHandler}
                    required
                    />
                     <span onClick={()=>{
                        conformfield=!conformfield;
                        setShowPassword((prev)=>!prev) ;
                    
                    }}>
                        {showPassword ?(<FaRegEyeSlash />):(<MdOutlineRemoveRedEye />) }
                    </span>
                </label>
            </div>
            <button className="signin-btn">Create Account</button>
        </form>
       </div>
    )
}

export default SignupForm ;