import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function PrivateRoute({children}){ 
    const {islogin} = useContext(AppContext)
    if(islogin){
        return children;
    }
    else{
        return <Navigate to="/login" />
    }
}
   

export default PrivateRoute ;