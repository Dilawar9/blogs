import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import About from './pages/About'
import { Routes, Route } from 'react-router-dom'
// import { Outlet } from 'react-router-dom'




function App() {

  return (
    <>
      <Navbar />
      <Routes>
        
        {/* <Route path='/' element={<Navbar />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
      </Routes>



      <div className='text-center'> 
        <h1 >footer</h1>
      </div>

    </>
  )
}

export default App
