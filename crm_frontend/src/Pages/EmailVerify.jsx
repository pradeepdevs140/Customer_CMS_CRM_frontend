import React, { useContext, useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../Components/Context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const EmailVerify = () => {
  const inputRef = useRef([])
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const { getdata, isLoggedIn, userData ,backendUrl} = useContext(AppContext)
  const navigate = useNavigate();
  const handleChange = (e, index) => {
    const value = e.target.value
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) return
    
    // Update OTP array
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Take only last digit
    setOtp(newOtp)
    
    // Move to next input if value entered
    if (value && index < 5) {
      inputRef.current[index + 1]?.focus()
    }
  }

  // Handle keyboard navigation and backspace
  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      e.preventDefault()
      const newOtp = [...otp]
      
      if (otp[index]) {
        // Clear current field
        newOtp[index] = ''
        setOtp(newOtp)
      } else if (index > 0) {
        // Move to previous field and clear it
        newOtp[index - 1] = ''
        setOtp(newOtp)
        inputRef.current[index - 1]?.focus()
      }
    }
    
    // Handle arrow keys for navigation
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRef.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRef.current[index + 1]?.focus()
    }
  }

  // Handle paste event to fill all fields at once
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    
    // Only allow numbers
    if (!/^\d+$/.test(pastedData)) return
    
    const newOtp = [...otp]
    pastedData.split('').forEach((char, i) => {
      if (i < 6) {
        newOtp[i] = char
      }
    })
    setOtp(newOtp)
    
    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5)
    inputRef.current[nextIndex]?.focus()
  }

  // Handle form submission
  const handleSubmit = async () => {
    const otpValue = otp.join('')
    if (otpValue.length !== 6) {
      alert('Please enter complete OTP')
      return
    }
    
    setLoading(true)
    try {

  const response = await axios.post(`${backendUrl}/verify-otp`, {
  otp: otpValue,  
});

   if(response.status==200){
    toast.success("OTP verifed successfully! 🥂");
    getdata();
    navigate("/");
    
   }
   else{
    toast.error("Invalid OTP");
   }
    } catch (error) {
      toast.error('Verification failed:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect (()=>{
    if(isLoggedIn && userData && userData.accountVerified == true){
      navigate("/")
    }
  },[isLoggedIn, userData])
 

  return (
    <div>
      <div className="email-verify-container d-flex align-items-center justify-content-center vh-100" 
           style={{background: "linear-gradient(90deg, #60faf9, #8268f9)"}}>
        <div className="text-center">
          <a href="/" className="text-decoration-none d-inline-flex align-items-center mb-4">
            <img src={assets.Logo} alt="logo" height={32} width={32} />
            <span className="fs-4 fw-semibold text-light ms-2">Customer</span>
          </a>
          
          <div className="p-5 rounded-4 shadow bg-dark" style={{width: "400px"}}>
            <h4 className="text-center fw-bold mb-2 text-light">Email Verify OTP</h4>
            <p className="text-center text-white-50 mb-4">Enter the 6-digit code sent to your email</p>
            
            <div className="d-flex justify-content-between gap-2 mb-4">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="form-control text-center fs-4 otp-input"
                  value={otp[i]}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onPaste={handlePaste}
                  ref={(el) => (inputRef.current[i] = el)}
                  style={{
                    width: '50px',
                    height: '50px',
                    fontSize: '1.5rem'
                  }}
                />
              ))}
            </div>
            
            <button 
              className="btn btn-primary w-100 fw-semibold" 
              disabled={loading || otp.join('').length !== 6}
              onClick={handleSubmit}
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerify