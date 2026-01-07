import React from 'react'

export const useGetData = () => {
   const {userID,name,profilePhoto,isAuth = false}= JSON.parse(localStorage.getItem("auth")) || []
    
    return  {userID,name,profilePhoto,isAuth}
  
}
