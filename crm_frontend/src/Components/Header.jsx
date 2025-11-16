import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from './Context/AppContext'
const Header = () => {
  const {userData} = useContext(AppContext);
  return (
    <div>
    <div className="text-center d-flex flex-column align-items-center justify-content-center py-5 px-3">
       <img src ={assets.Logo} alt ="header" width={120} className='mb-4' />
       <h5 className="fw-semibold">
        Hey {userData ? userData.name :'Developer'} <span role="img" aria-label='wave'>Hi</span>

       </h5>
       <h1 className='fw-bold display-5 mb-3'>
        Welcome to home page
       </h1>
       <p className="text-muted fs-5 mb-4" style={{maxWidth:"500px"}}>
        Lets start with the quick product
       </p>
       <button className="btn btn-outline-dark rounded-pill px-4 py-2">
        Get Started
       </button>
    </div>
      
    </div>
  )
}

export default Header
