export interface AuthContextValue {
  uid: string | null
  loading: boolean
  logIn: (email: string, password: string) => Promise<{ [key: string]: string } | void>
  signUp: (email: string, password: string) => Promise<{ [key: string]: string } | void>
  logOut: () => Promise<{ [key: string]: string } | void>
}