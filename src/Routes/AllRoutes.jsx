import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from '../Pages/Login';
import Home from '../Components/Home';

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default AllRoutes