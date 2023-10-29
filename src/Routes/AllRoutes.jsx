import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from '../Pages/Login';
import Home from '../Components/Home';
import ViewHotels from '../AdminPanel/ViewHotels';

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<ViewHotels />} />
      </Routes>
    </>
  )
}

export default AllRoutes