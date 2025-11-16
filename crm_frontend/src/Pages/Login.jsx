import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Image from '../assets/react.svg'
import { useState } from 'react'
import { AppContext } from '../Components/Context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
  const [iscreateAccount, setiscreateAccount] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setisloading] = useState(false);
  const { backendUrl , setIsLoggedIn, getdata } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setisloading(true);
    
    try {
      if (iscreateAccount) {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name, 
          email, 
          password
        });
        
        if (response.status === 201) {
          navigate("/");
          toast.success("Account created successfully");
        }
      } else {
        const response = await axios.post(`${backendUrl}/login`, {
          email, 
          password
        });   
        if (response.status === 200) {
             setIsLoggedIn(true);
             getdata();
          
          navigate("/");
          toast.success("Login successful");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setisloading(false);
    }
  }

  return (
    <div className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
      style={{border: "none", background: "linear-gradient(90deg, #6a5af9, #8268f9)"}}>
      
      <div style={{position:"absolute", top:"20px", left:"30px", display:"flex", alignItems:"center"}}>
        <Link to="/" style={{display:"flex", gap:5, alignItems:"center", fontSize:"24px", textDecoration:"none"}}>
          <img src={Image} alt="logo" height={32} width={32} />
          <span className="fw-bold fs-4 text-light" style={{color:"white"}}>Customer</span>
        </Link>
      </div>
      
      <div className="card p-4" style={{maxWidth:"400px", width:"100%"}}>
        <h2 className="text-center mb-4">
          {iscreateAccount ? "Create account" : "Login"}
        </h2>
        
        <form onSubmit={onSubmitHandler}>
          {iscreateAccount && (
            <div className="mb-3">
              <label htmlFor='name' className='form-label'>Full Name</label>
              <input 
                type="text" 
                id="name" 
                className='form-control' 
                onChange={(e) => setname(e.target.value)}
                value={name}
                placeholder='Enter name' 
                required 
              />
            </div>
          )}
          
          <div className="mb-3">
            <label htmlFor='email' className='form-label'>Email Id</label>
            <input 
              type="email" 
              id="email" 
              className='form-control' 
              onChange={(e) => setemail(e.target.value)}
              value={email}
              placeholder='Enter Email' 
              required 
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor='password' className='form-label'>Password</label>
            <input 
              type="password" 
              id="password" 
              className='form-control' 
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              placeholder='******' 
              required 
            />
          </div>
          
          <div className="d-flex justify-content-between mb-3">
            <Link to="/reset-password" className='text-decoration-none'>Forgot Password?</Link>
          </div>
        
          <button type="submit" className='btn btn-primary w-100' disabled={isloading}>
            {isloading ? "Loading..." : iscreateAccount ? "Sign up" : "Login"}
          </button>
        </form>
        
        <div className="text-center mt-3">
          <p className="mb-0">
            {iscreateAccount ? (
              <>
                Already have an account?{' '}
                <span 
                  onClick={() => setiscreateAccount(false)}
                  className='text-decoration-underline' 
                  style={{cursor:"pointer"}}>
                  Login here
                </span>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <span 
                  onClick={() => setiscreateAccount(true)}
                  className='text-decoration-underline' 
                  style={{cursor:"pointer"}}>
                  Sign up
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login