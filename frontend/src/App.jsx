import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import About from './pages/About'
import { Routes ,Route} from 'react-router-dom'




function App() {

  return (
    <>

<Routes>
  <Route path='/' element={<Navbar/>}/>
  <Route path='/home' element={<Home/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/about' element={<About/>}/>
</Routes>

    </>
  )
}

export default App
