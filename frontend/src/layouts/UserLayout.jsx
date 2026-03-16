import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const UserLayout = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="app-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default UserLayout