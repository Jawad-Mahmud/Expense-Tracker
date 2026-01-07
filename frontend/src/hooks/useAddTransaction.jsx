import React from 'react'
import {addDoc,collection, serverTimestamp} from "firebase/firestore"
import { db } from '../config/firebase'
import { useGetData } from './useGetData'

export const useAddTransaction = () => {
    const transctionCollectionRef=collection(db,"transaction");
    const { userID } = useGetData();
     const addTransaction = async({
     description,
     transactionAmount,
     transactionType,

     })=>{
       await addDoc(transctionCollectionRef,{
     userID,description,transactionAmount,transactionType,
     createdAt:serverTimestamp()

       })
    

     }
  return{ 
     addTransaction
   };
}
