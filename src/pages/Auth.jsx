import React, { use } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../config/firebase'
import { useNavigate,Navigate } from 'react-router-dom'
import { useGetData } from '../hooks/useGetData'
import "../style/Auth.css"

export const Auth = () => { 
   const  navigate = useNavigate();
   const signInWithGoogle= async() => {
   const results = await signInWithPopup(auth,provider)
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true
    };
    console.log("userInfo",results);
    localStorage.setItem("auth",JSON.stringify(authInfo));
    
    navigate("/expense-tracker");
  }
  

  return (
    <>
      <div className='login-page'>
        <h1>Sign in with Google to continue</h1>
      <button className='login-with-google-btn' onClick={signInWithGoogle}>
        Sign In With Google
      </button>
      </div>
    </>
  )
}
