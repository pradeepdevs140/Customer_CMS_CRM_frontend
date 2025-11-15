import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import EmailVerify from './Pages/EmailVerify'
import ResetPassword from './Pages/ResetPassword'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
