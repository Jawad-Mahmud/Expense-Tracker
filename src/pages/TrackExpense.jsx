import React, { useState } from 'react'
import { useAddTransaction } from '../hooks/useAddTransaction'
import { useGetTransaction } from '../hooks/useGetTransaction';
import { useGetData } from '../hooks/useGetData';
import { useDeleteTransaction } from '../hooks/useDeleteTransaction';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import '../style/TrackExpense.css';

export const TrackExpense = () => {
  const {deleteTransact} = useDeleteTransaction();
    const{addTransaction} = useAddTransaction();
    const {transactions,totalTransaction} = useGetTransaction();
    const {name,profilePhoto} = useGetData();
    const [description, setdescription] = useState("");
    const [transactionAmount, settransactionAmount] = useState("");
    const [transactionType, settransactionType] = useState("expense");
    const {income,expense,balance} = totalTransaction
    const navigate =useNavigate();
    
    const signUserOut = async() =>{
     try {
      await signOut(auth);
      localStorage.clear();
      alert("You have succesfully sign out");
      navigate("/")
     } catch (error) {
      console.error(error);
     }
    }
    const onSubmit =(e)=>{
        e.preventDefault();
        addTransaction({description,
            transactionType,
            transactionAmount
        })
        
        setdescription("");
        settransactionAmount("")
    }
  return (
    <>
    <div className="main-container">
      {profilePhoto && (
          <div className='profile'>
            {" "}
            <img src={profilePhoto} className='profile-photo' alt="" />
            <button className='signout-btn' onClick={signUserOut}>Sign Out</button>
          </div>
        )
      }
      <div className='container'>

     <h1>{name} Track Your Expense</h1>

     <div className='balance'>
      <h2>Your Balance</h2>
      <p>{balance}</p>

     </div>
     <div className="income+expenses">
        <div className="income">
           <h2>Income</h2>
           <p>{income}</p>

        </div>
        <div className="expenses">
            <h2>Expenses</h2>
            <p>{expense}</p>
        </div>

     </div>

      </div>
      <form className='Transaction' onSubmit={onSubmit}>

        <input type="text" 
        placeholder='Description'
        value={description} 
        required 
        onChange={(e)=>setdescription(e.target.value)}
        />
        <input 
        type="number" 
        placeholder='Amount'
        value={transactionAmount}
         required
         onChange={(e)=>settransactionAmount(Number(e.target.value))}        
          />
        <input 
        type="radio" 
        id='expense' 
        value="expense"
        checked={transactionType==="expense"} 
        onChange={(e)=>settransactionType(e.target.value)}
        />
        <label
         htmlFor="expense">Expense</label>
        <input
         type="radio" 
         id='income' 
         value="income" 
         checked={transactionType=== "income"}
         onChange={(e)=>settransactionType(e.target.value)}
         />
        <label
         htmlFor="income">Income</label>

        <button type='submit'>Submit Expenses</button>
      </form>

    </div>

    <ul>
      {
        transactions.map((transact)=>{
          const {id,description,transactionAmount,transactionType} = transact;
          return <li key = {id}>
            <h4>{description}</h4>
            <p>
              ${transactionAmount}. <label>{transactionType}</label>
            </p>
            <button onClick={()=>{
             deleteTransact(id) 
            }}>delete</button>
          </li>
        })
      }
    </ul>
     
    </>
  )
}
