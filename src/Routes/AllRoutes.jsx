import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from '../Pages/Login';
import Home from '../Components/Home';
import ViewExpenses from '../AdminPanel/ViewExpenses';

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<ViewExpenses />} />
      </Routes>
    </>
  )
}

export default AllRoutes