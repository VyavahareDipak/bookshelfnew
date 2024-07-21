import { createContext,useState } from "react";
import toast from "react-hot-toast";
export const AppContext = createContext();

function AppContextProvider({children}){
    const [islogin ,setIslogin] = useState(localStorage.getItem("user")!==null);
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [loading,setLoading] = useState(false);
    const [query,setQuery] = useState("");
    const [posts,setPosts] = useState([]);
    const [allPosts,setAllPosts] = useState([]) ;

    //fetch post
    const refreshtoken=async()=>{
        const result = await fetch("/api/v1/islogin",{
            method:"POST",
            headers:{
               "Content-Type":"application/json"
            },
            body:localStorage.getItem("user") 
           })
           const data =await result.json();
           if(data.success===true){
               setIslogin(true) ;
            //    navigate('/') ;
               toast.success("logged in successfully");
               console.log(data);
            //    localStorage.setItem("user",JSON.stringify(data.data.user));
               localStorage.setItem("token",JSON.stringify(data.data.token));
           }else{
              
               toast.error("enter valid details");
           }
    }
    //token refresh in every 71 hrs .because expiry time of token is 3 days
    if(islogin===true){
        console.log("setinterval started");
        
        setInterval(refreshtoken,71*60*60*1000);
    }
    async function fetchData(){
        
        setLoading(true) ;
        try{
        const res = await fetch(`/api/v1/searchPost?query=${query}`,{
            headers:{
                //JSON.parse() takes a JSON string and transforms it into a JavaScript object.
                'authorization':`${JSON.parse(localStorage.getItem('token'))}`
            }
        }) ;
        const data = await res.json();
        console.log("successful",data);
        setAllPosts(data);
        setPosts(()=>{
            return (
              allPosts.filter((post)=>{
               return post.user !== user._id ;
              })
            )
          })
        }catch(err){
            console.log("got error",err);
        }
        setLoading(false) ;
    }

    const value = {
        islogin,
        setIslogin,
        loading,
        setLoading,
        posts,
        setPosts,
        allPosts,
        setAllPosts,
        query,
        setQuery,
        fetchData,
        user,setUser
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider ;