import React from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <> 
    <div className='landing   '>
    <h3 className='d-flex justify-content-center align-items-center text-dark'>DashDox</h3>
    <p className='d-flex justify-content-center align-items-center text-dark'>DashDox is an innovative and user-friendly documentation platform designed to streamline the way information is created, shared, and accessed.</p>
      <div className='d-flex justify-content-center align-items-center'>
        <Link to={'/documentlist'}>
            <button className='btn bg-success   text-light'>Get Started</button>
        </Link>
        </div>
    </div>
    </>
  )
}

export default Landing
