import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import firebase from 'firebase/compat/app'
import FirebaseError = firebase.FirebaseError

export const LogIn = async (email: string, password: string) => {
  const auth = getAuth()
  try {
    return await signInWithEmailAndPassword(auth, email, password)
  } catch (e: unknown) {
    console.log((e as Error).name)
    return (e as FirebaseError).code
  }
}

export const SignUp = async (email: string, password: string) => {
  const auth = getAuth()
  try {
    return await createUserWithEmailAndPassword(auth, email, password)
  } catch (e: unknown) {
    return (e as FirebaseError).code
  }
}

export const LogOut = async () => {
  const auth = getAuth()
  await auth.signOut()
}