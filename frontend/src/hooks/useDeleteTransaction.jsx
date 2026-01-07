import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../config/firebase'

export const useDeleteTransaction = () => {
   const [deleteData, setDeleteData] = useState(null) 
   const [loading, setloading] = useState(true)
      const deleteTransact = async(id) =>{

        try {
            const docRef = doc( db ,"transaction" , id);
            await deleteDoc(docRef);

            
        } catch (err) {
            console.error(err);
        }finally{
            setloading(false);
        }



      }
  return {deleteTransact,loading}
}
