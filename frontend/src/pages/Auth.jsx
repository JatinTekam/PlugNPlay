import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Auth = ({status}) => {
  return (
    <div>
      {status ? <Navigate to="/user/profile" /> : <Outlet />}
    </div>
  )
}

export default Auth
