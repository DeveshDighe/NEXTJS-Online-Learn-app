"use client"


import { useContext, useEffect } from "react";
import { MyContext } from "@/Context/AuthContext";
import HomeContainer from "@/components/UserComp/HomeContainer";
import Navbar from '@/components/UserComp/Navbar'; // Update import statement to use consistent casing
import axios from "axios";
import Cookies from "js-cookie";



export default function Home() {

  const {state , dispatch} = useContext(MyContext)


  const getUserData = async () => {
    try {
      const jwtData = Cookies.get("MyToken");
  
      if (!jwtData) {
        console.error('JWT token not found in local storage');
        return; // Exit early if token is not found
      }
  
      const response = await axios.post('/api/auth/getUserProfile', { jwt: jwtData });
      if (response.data.success) {
        dispatch({type : 'ADD_USER' , payload : response.data.user})

      }
  
      // Handle response data if needed
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  

  useEffect(() => {
    getUserData();
  }, [])
  return (
    <>
      <Navbar/>
      <HomeContainer/>
    </>
  );
}
