import { FC, PropsWithChildren, useState } from 'react'
import { AuthContextValue } from './types.ts'
import { AuthContext } from './authContext.ts'
import { LogIn, LogOut, SignUp } from '../../api/auth.ts'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [uid, setUid] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const auth = getAuth()
  onAuthStateChanged(auth, (state) => {
    setUid(state?.uid || null)
    setLoading(false)
  })

  const logIn = async (email: string, password: string) => {
    const res = await LogIn(email, password)

    if (typeof res !== 'string') {
      setUid(res.user.uid)
      return
    }

    switch (res) {
      case 'auth/invalid-credential':
        return { 'email': 'Неверный логин или пароль' }
      default:
        return { 'email': 'Что-то пошло не так... Попробуйте позже' }
    }
  }

  const signUp = async (email: string, password: string) => {
    const res = await SignUp(email, password)

    if (typeof res !== 'string') {
      setUid(res.user.uid)
      return
    }

    switch (res) {
      case 'auth/email-already-in-use':
        return { 'email': 'Пользователь уже существует' }
      default:
        return { 'email': 'Что-то пошло не так... Попробуйте позже' }
    }
  }

  const logOut = async () => {
    await LogOut()
  }

  const value: AuthContextValue = {
    uid,
    loading,
    logIn,
    signUp,
    logOut
  }

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}