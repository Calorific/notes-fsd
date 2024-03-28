import { createContext, useContext } from 'react'
import { AuthContextValue } from './types.ts'

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  return useContext(AuthContext)
}