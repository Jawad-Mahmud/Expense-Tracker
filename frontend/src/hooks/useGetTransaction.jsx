import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { useGetData } from './useGetData'
import { useDeleteTransaction } from './useDeleteTransaction'
export const useGetTransaction = () => {
  let unsubscribe;
  const transactionCollection = collection(db, "transaction");
  const { userID } = useGetData();
  const [transactions, settransactions] = useState([]);
  const [totalTransaction, settotalTransaction] = useState({
    balance:0,
    expense:0,
    income:0, 
  })
  
  const getTransaction = () => {
    try {
      const queryTransactions =  query(
        transactionCollection,
        where("userID", "==", userID),
        orderBy("createdAt") ) 
      
       
       unsubscribe = onSnapshot(
        queryTransactions,
        (snapData) => {
          const docs = [];
          let totalExpense = 0;
          let totalIncome = 0;
          snapData.docs.forEach((doc) => {
            const data = doc.data();  
            const id = doc.id;
            docs.push({id,...data});   
            
               if(data.transactionType === "expense"){
            totalExpense += Number(data.transactionAmount)

          }else{
            totalIncome += Number(data.transactionAmount)
          }

          });



          
          settransactions(docs); 
         
         
 

          let balance = totalIncome-totalExpense;
          settotalTransaction({
           balance,
           expense:totalExpense,
           income:totalIncome

          })
          
        });
       return () => unsubscribe();


     } catch (error) {
      console.error(error); 
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return { transactions,totalTransaction };
};
