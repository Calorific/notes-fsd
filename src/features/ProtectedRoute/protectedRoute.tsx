import { FC, PropsWithChildren } from 'react'
import { useAuth } from '../../shared/context/Auth/authContext.ts'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuth()

  if (!auth?.uid)
    return <Navigate to='/auth/login' replace />

  return children
}