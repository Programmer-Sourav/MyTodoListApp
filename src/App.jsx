import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationPage from './Pages/RegistrationPage'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import { Route, Routes } from 'react-router'
import { RequiresAuth } from './Context/RequiresAuth'

function App() {


  return (
    <>
     <Routes>
      <Route path='/' element={<RegistrationPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/home' element={<RequiresAuth><HomePage/></RequiresAuth>}/>
     </Routes>
      {/* <RegistrationPage/> */}
      {/* <LoginPage/> */}
      {/* <HomePage/> */}
    </>
  )
}

export default App
