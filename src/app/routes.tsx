import { Navigate, RouteObject } from 'react-router-dom'
import { AuthLayout } from '../shared/ui/Layouts/authLayout.tsx'
import { LoginPage } from '../pages/LoginPage/loginPage.tsx'
import { RegisterPage } from '../pages/RegisterPage/registerPage.tsx'
import { ProtectedRoute } from '../features/ProtectedRoute/protectedRoute.tsx'
import { MainLayout } from '../shared/ui/Layouts/mainLayout.tsx'
import { MainPage } from '../pages/MainPage/mainPage.tsx'


export const routes: RouteObject[] = [
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='login' />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ]
  },
  {
    path: '',
    element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: '*',
        element: <Navigate to='/' replace />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='' />
  }
]