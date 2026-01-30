import { Navigate, Outlet } from 'react-router-dom'


const Dashboard = ({status}) => {
  return (
    <div>
      {status ? <Outlet/>  : <Navigate to="/login" replace/>}
    </div>
  )
}

export default Dashboard
