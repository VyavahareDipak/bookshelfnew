import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PostForm(){
    const navigate = useNavigate();
    const [FormData,setFormData] = useState({user:`${JSON.parse(localStorage.getItem("user"))._id}` ,name:"",image:"",price:"",location:"",description:""})
    console.log();
    function changeHandler(e){
        setFormData((prev)=>{
            return(
                {...prev,
                   [e.target.name]:e.target.value
                }
            )
        })
        console.log(FormData);
    }

    function imageHandler(event){

        const file = event.target.files[0];
        if(file){
            const reader = new FileReader()
            reader.onload =(e)=>{
                const imgData = e.target.result;
                setFormData((prev)=>({
                    ...prev,
                    image:imgData,
                }))
            }
            reader.readAsDataURL(file);
        }
    }

    async function submitHandeler(e){
        e.preventDefault();
        console.log(FormData);
        try{
            const res = await fetch('/api/v1/add/post',{
                method:'POST',
                headers:{
                    'content-type':'application/json',
                    'authorization':`${JSON.parse(localStorage.getItem('token'))}`
                },
                body:JSON.stringify(FormData),
            });
            if(res.ok){
                console.log("data uploaded successfully");
                toast.success("Post is live now..");
                navigate('/') ;
                
            }
            else{
                console.log("got an error");
                toast.error("Try after some time")
            }
        }
        catch(err){
            console.error("error:",err);
            toast.error("Try after some time")
        }

    }

    return(
        <div>
        <form onSubmit={submitHandeler} className="login-form">
          <label>
              <p>Book Name<sup>*</sup></p>
          <input 
          type="text" 
          value={FormData.name} 
          name ="name"
          onChange={changeHandler}
          placeholder="Enter Book"
          required></input>
          </label>
          <label>
              <p>Book Price<sup>*</sup></p>
          <input 
          type="text" 
          value={FormData.price} 
          name ="price"
          onChange={changeHandler}
          placeholder="Enter Book Price"
          required></input>
          </label>

          <label>
              <p>Location<sup>*</sup></p>
          <input 
          type="text" 
          value={FormData.location} 
          name ="location"
          onChange={changeHandler}
          placeholder="Enter Location"
          required></input>
          </label>
          
          <label>
              <p>Book Description<sup>*</sup></p>
          <textarea
          type="text" 
          value={FormData.description} 
          name ="description"
          onChange={changeHandler}
          placeholder="Enter Book Description"
          required>
            
          </textarea>
          </label>
          
          <input
                type="file"
                accept="image/*"
                placeholder="add image"
                name="image"
                required
                onChange={imageHandler}
                >
                </input>
                <button type="submit" className="signin-btn" >submit</button>
        </form>
      </div>
    )
}

export default PostForm ;