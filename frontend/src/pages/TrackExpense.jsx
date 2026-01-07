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
   <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
  {profilePhoto && (
    <div className="flex items-center justify-between mb-8 ">
      <img src={profilePhoto} className="w-12 h-12 rounded-full border-2 border-emerald-500 shadow-md" alt="" />
      <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors" onClick={signUserOut}>Sign Out</button>
    </div>
  )}
  
  <div className="max-w-2xl mx-auto">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{name} Track Your Expense</h1>

    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-2">Your Balance</h2>
      <p className="text-3xl md:text-4xl font-bold text-gray-900">${balance}</p>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <h2 className="text-sm text-emerald-600 font-medium mb-1">Income</h2>
        <p className="text-xl md:text-2xl font-bold text-emerald-600">${income}</p>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <h2 className="text-sm text-red-600 font-medium mb-1">Expenses</h2>
        <p className="text-xl md:text-2xl font-bold text-red-600">${expense}</p>
      </div>
    </div>

    <form className="bg-white rounded-2xl shadow-lg p-6 mb-8" onSubmit={onSubmit}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Transaction</h3>
      <input 
        type="text" 
        placeholder="Description"
        value={description} 
        required 
        onChange={(e) => setdescription(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      />
      <input 
        type="number" 
        placeholder="Amount"
        value={transactionAmount}
        required
        onChange={(e) => settransactionAmount(Number(e.target.value))}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      />
      <div className="flex gap-4 mb-4">
        <label htmlFor="expense" className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${transactionType === "expense" ? "border-red-500 bg-red-50 text-red-600" : "border-gray-200 text-gray-600"}`}>
          <input type="radio" id="expense" value="expense" checked={transactionType === "expense"} onChange={(e) => settransactionType(e.target.value)} className="hidden" />
          Expense
        </label>
        <label htmlFor="income" className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${transactionType === "income" ? "border-emerald-500 bg-emerald-50 text-emerald-600" : "border-gray-200 text-gray-600"}`}>
          <input type="radio" id="income" value="income" checked={transactionType === "income"} onChange={(e) => settransactionType(e.target.value)} className="hidden" />
          Income
        </label>
      </div>
      <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">Submit</button>
    </form>
  </div>

  <ul className="max-w-2xl mx-auto space-y-3">
    {transactions.map((transact) => {
      const { id, description, transactionAmount, transactionType } = transact;
      return (
        <li key={id} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-800">{description}</h4>
            <p className={`text-sm ${transactionType === "income" ? "text-emerald-600" : "text-red-600"}`}>
              ${transactionAmount} · {transactionType}
            </p>
          </div>
          <button onClick={() => deleteTransact(id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors">Delete</button>
        </li>
      );
    })}
  </ul>
</div>


     
    </>
  )
}
