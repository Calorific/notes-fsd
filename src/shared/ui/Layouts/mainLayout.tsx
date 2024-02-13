import { FC } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Typography } from 'antd'
import logoutIcon from '../../assets/logout.svg'
import { useAuth } from '../../context/Auth/authContext.ts'
import { NotesProvider } from '../../context/Notes/notesProvider.tsx'

export const MainLayout: FC = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const logOut = async () => {
    await auth?.logOut()
    navigate('/auth/login')
  }

  return <NotesProvider>
    <div className='flex items-center flex-wrap px-16 bg-gray-100 justify-between'>
      <Typography.Title className='mt-4' level={2}>Notes</Typography.Title>
      <img src={logoutIcon} alt="Logout" onClick={logOut} className='cursor-pointer max-h-[30px]' />
    </div>
    <div className='min-h-full'>
      <Outlet />
    </div>
  </NotesProvider>
}