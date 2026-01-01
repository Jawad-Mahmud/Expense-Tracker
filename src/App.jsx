import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {Auth} from './pages/Auth'
import { TrackExpense } from './pages/trackExpense'
import { ProtectedRoutes } from './ProtectedRoutes/ProtectedRoutes'

export const App = () => {
  return (
    <>
      <div className='App'>
      
    
          <Routes>
            <Route path="/"  element={<Auth/>} />
            <Route
              path="/expense-tracker"
              element={
                <ProtectedRoutes>
                     <TrackExpense /> 
                </ProtectedRoutes>
                  
                
              }
            />
          </Routes>
        
      </div>
    </>
  )
}
