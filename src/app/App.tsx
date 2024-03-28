import { FC } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes.tsx'
import { useAuth } from '../shared/context/Auth/authContext.ts'
import { Loader } from '../shared/ui/Loader/loader.tsx'

export const App: FC = () => {
  const elements = useRoutes(routes)
  const auth = useAuth()

  if (auth?.loading)
    return <div className='flex justify-center items-center min-h-screen'>
      <Loader />
    </div>

  return elements
}