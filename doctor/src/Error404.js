import React from 'react'
import "./Error404.css"
import { useNavigate } from 'react-router-dom'


function Error404() {
  const navigate=useNavigate()
  const redirect_home=()=>
  {
    navigate('/')
  }
  return (
    
    <body className='errors-body'>
        <div className='errors-container'>
            <h1 className='errors-h1'>404</h1>
            <p className='errors-p'>Page Not Found</p>
            <p className='errors-p'>The page you are looking for might have been removed or doesn't exist.</p>
            <button className='errors-button' onClick={redirect_home}>Go Back</button>
        </div>

    </body>
    
  )
}

export default Error404