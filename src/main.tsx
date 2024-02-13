import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app/App.tsx'
import './index.css'

import firebase from 'firebase/compat/app'
import { AuthProvider } from './shared/context/Auth/authProvider.tsx'
import { firebaseConfig } from '../firebase.ts'



firebase.initializeApp(firebaseConfig)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
