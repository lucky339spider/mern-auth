import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const AppContent = createContext()

export const AppContextProvider = (props)=>{

    axios.defaults.withCredentials = true;

    const backendUrl = 'https://mern-auth-backend-pm7j.onrender.com'
    const [isLoggedin, setIsLoggedin]= useState(false)
    const [userData, setUserData]= useState(false)

    const getAuthState = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth', {
  withCredentials: true
});
            if(data.success){
                setIsLoggedin(true)
                getUserData()
            }
        } catch (error) {
            //toast.error(data.message)
            console.log(error.message)
        }
    }

    const getUserData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data')
            //data.success ? setUserData(data.userData) : toast.error(data.message)
            data.success ? setUserData(data.userData) : console.log(data)
        } catch (error) {
            //toast.error(data.message)
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getAuthState();
    },[])

    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData

    }
    return(
        <AppContent.Provider value={value}>
            {props.children}

        </AppContent.Provider>
    )

}
