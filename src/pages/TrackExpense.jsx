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
   <div className="min-h-screen bg-[#f6f6f7] p-4 sm:p-6 font-sans">
  {profilePhoto && (
    <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-xl shadow-sm border border-[#e3e3e3]">
      <img src={profilePhoto} className="w-10 h-10 rounded-full ring-2 ring-[#008060] object-cover" alt="" />
      <button className="px-4 py-2 text-sm font-medium text-[#637381] hover:text-[#202223] hover:bg-[#f1f1f1] rounded-lg transition-all" onClick={signUserOut}>Sign Out</button>
    </div>
  )}
  
  <div className="bg-white rounded-xl shadow-sm border border-[#e3e3e3] p-5 sm:p-6 mb-6">
    <h1 className="text-xl sm:text-2xl font-bold text-[#202223] mb-6">{name} Track Your Expense</h1>

    <div className="bg-[#f4f6f8] rounded-lg p-4 mb-4 text-center">
      <h2 className="text-sm font-medium text-[#637381] mb-1">Your Balance</h2>
      <p className="text-2xl sm:text-3xl font-bold text-[#202223]">${balance}</p>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="bg-[#e3f1df] rounded-lg p-4 text-center">
        <h2 className="text-sm font-medium text-[#008060] mb-1">Income</h2>
        <p className="text-xl font-bold text-[#008060]">${income}</p>
      </div>
      <div className="bg-[#fbeae5] rounded-lg p-4 text-center">
        <h2 className="text-sm font-medium text-[#d72c0d] mb-1">Expenses</h2>
        <p className="text-xl font-bold text-[#d72c0d]">${expense}</p>
      </div>
    </div>
  </div>

  <form className="bg-white rounded-xl shadow-sm border border-[#e3e3e3] p-5 sm:p-6 mb-6 space-y-4" onSubmit={onSubmit}>
    <input type="text" placeholder="Description" value={description} required onChange={(e) => setdescription(e.target.value)}
      className="w-full px-4 py-3 rounded-lg border border-[#c9cccf] bg-white text-[#202223] placeholder:text-[#8c9196] focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-transparent" />
    <input type="number" placeholder="Amount" value={transactionAmount} required onChange={(e) => settransactionAmount(Number(e.target.value))}
      className="w-full px-4 py-3 rounded-lg border border-[#c9cccf] bg-white text-[#202223] placeholder:text-[#8c9196] focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-transparent" />
    
    <div className="flex gap-4 items-center">
      <label className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all ${transactionType === "expense" ? "border-[#d72c0d] bg-[#fbeae5] text-[#d72c0d]" : "border-[#c9cccf] text-[#637381] hover:border-[#8c9196]"}`}>
        <input type="radio" id="expense" value="expense" checked={transactionType === "expense"} onChange={(e) => settransactionType(e.target.value)} className="sr-only" />
        Expense
      </label>
      <label className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all ${transactionType === "income" ? "border-[#008060] bg-[#e3f1df] text-[#008060]" : "border-[#c9cccf] text-[#637381] hover:border-[#8c9196]"}`}>
        <input type="radio" id="income" value="income" checked={transactionType === "income"} onChange={(e) => settransactionType(e.target.value)} className="sr-only" />
        Income
      </label>
    </div>

    <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-[#008060] text-white font-semibold rounded-lg hover:bg-[#006e52] focus:outline-none focus:ring-2 focus:ring-[#008060] focus:ring-offset-2 transition-all">Submit Expenses</button>
  </form>
</div>

<ul className="max-w-2xl mx-auto px-4 space-y-3">
  {transactions.map((transact) => {
    const { id, description, transactionAmount, transactionType } = transact;
    return (
      <li key={id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-[#e3e3e3] hover:shadow-md transition-shadow">
        <div>
          <h4 className="font-semibold text-[#202223]">{description}</h4>
          <p className={`text-sm ${transactionType === "income" ? "text-[#008060]" : "text-[#d72c0d]"}`}>
            ${transactionAmount} <span className={`text-xs px-2 py-0.5 rounded-full ${transactionType === "income" ? "bg-[#e3f1df] text-[#008060]" : "bg-[#fbeae5] text-[#d72c0d]"}`}>{transactionType}</span>
          </p>
        </div>
        <button onClick={() => deleteTransact(id)} className="p-2 text-[#8c9196] hover:text-[#d72c0d] hover:bg-[#fbeae5] rounded-lg transition-all">delete</button>
      </li>
    );
  })}
</ul>

     
    </>
  )
}
