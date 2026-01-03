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
     <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4'>
  <div className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center'>
    <div className='w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6'>
      <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
      </svg>
    </div>
    <h1 className='text-2xl font-bold text-slate-800 mb-2'>Welcome Back</h1>
    <p className='text-slate-500 mb-8'>Sign in with Google to continue</p>
    <button 
      className='w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 rounded-xl px-6 py-4 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm'
      onClick={signInWithGoogle}
    >
      <svg className='w-5 h-5' viewBox='0 0 24 24'>
        <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/>
        <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/>
        <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/>
        <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/>
      </svg>
      Sign In With Google
    </button>
  </div>
</div>

    </>
  )
}
