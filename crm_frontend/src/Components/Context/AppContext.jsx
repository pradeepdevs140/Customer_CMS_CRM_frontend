import { createContext, useEffect, useState } from "react";
import { AppConstants } from "../../Util/constant";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();
 const backendUrl = AppConstants.BACKEND_URL;

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials=true;
    const backendUrl = AppConstants.BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);
    const getdata = async ()=>{
    try{
        const resposne = await axios.get(`${backendUrl}/api/user/profile`);
        if(resposne.status===200){
            setUserData(resposne.data);
        }
        else{
            toast.error("Unable to Ftech the profile");
        }
    }
    catch(error){
        toast.error(error.message);
    }
}
const getAuthState =async()=>{
try{
    const response = await axios.get(`${backendUrl}/is-authenticated`);
    if(response.status==200){
        setIsLoggedIn(true);
        await getdata();
    }
    else{
        setIsLoggedIn(false);
    }
}
catch(error){
if(error.response){
    const msg = error.response.data?.message || "Authentication checked failed";
    toast.error(msg);
}
else{
    toast.error(error.message);
}
}
}
useEffect(()=>{
    getAuthState()
},[])
    const contextValue = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getdata
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}