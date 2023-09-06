import React from 'react'
import {BrowserRouter as Router,Routes,Route, Outlet} from 'react-router-dom'
import Login from './Login'
import Signin from './Signin'
import Signup from './Signup'
function Form() {
  return (
    <div>
        <Router>
        <Routes>
          <Route path='login' element={<Outlet/>}>
            <Route index element={<Login />} />
            <Route path='signin' element={<Signin/>}/>
            <Route path='signup' element={<Signup/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default Form