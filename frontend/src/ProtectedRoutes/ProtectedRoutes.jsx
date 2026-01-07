import React, { Children, useEffect } from 'react'
import { useGetData } from '../hooks/useGetData'
import { Navigate, useNavigate } from 'react-router-dom';

export const ProtectedRoutes = ({children}) => {
    const navigate = useNavigate()
    const {isAuth} = useGetData();

   useEffect(() => {
    
   if(!isAuth){

    navigate("/");

   } 
    
   }, [isAuth])
   

  return <>{children}</>
}
