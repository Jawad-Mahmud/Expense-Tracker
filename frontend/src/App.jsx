import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Auth } from './pages/Auth'
import { TrackExpense } from './pages/TrackExpense' // import { TrackExpense } from './pages/trackExpense' typo in filepath 
import { ProtectedRoutes } from './ProtectedRoutes/ProtectedRoutes'
import { ShopifyPreview } from './components/ShopifyPreview'
export const App = () => {
  return (
    <>
      <div className='App'>


        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/expense-tracker"
            element={
              <ProtectedRoutes>
                <TrackExpense />

              </ProtectedRoutes>


            }
          />
          <Route path="/shopify" element={<ShopifyPreview />} />
        </Routes>

      </div>
    </>
  )
}
