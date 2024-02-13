import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/Auth/authContext.ts'

export const AuthLayout: FC = () => {
  const auth = useAuth()

  if (auth?.uid)
    return <Navigate to='/' />

  return <>
    <div className='flex justify-center items-center min-h-screen py-4'>
      <Outlet />
    </div>
  </>
}