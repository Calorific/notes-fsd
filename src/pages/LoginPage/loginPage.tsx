import { FC, useState } from 'react'
import { Button, Card, Typography } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { FormComponent } from '../../shared/ui/FormComponent/formComponent.tsx'
import { SubmitData } from '../../shared/ui/FormComponent/types.ts'
import { TextInput } from '../../shared/ui/TextInput/textInput.tsx'
import { logInValidationScheme } from './validation.ts'
import { Loader } from '../../shared/ui/Loader/loader.tsx'
import { useAuth } from '../../shared/context/Auth/authContext.ts'

export const LoginPage: FC = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = async (data: SubmitData) => {
    setLoading(true)
    const err = await auth?.logIn(data.email, data.password)

    setLoading(false)

    if (!err) {
      navigate('/')
      return
    }

    return err
  }


  return <>
    <div className={loading ? 'block' : 'hidden'}><Loader /></div>
    <Card className={'w-[310px] mx-[5px] ' + (!loading ? 'block' : 'hidden')}>
      <Typography.Title level={2}>Авторизация</Typography.Title>

      <FormComponent onSubmit={handleLogin} className='mb-2' validationScheme={logInValidationScheme}>
        <TextInput name='email' placeholder='Email' />
        <TextInput name='password' type='password' placeholder='Пароль' />
        <Button htmlType='submit'>Войти</Button>
      </FormComponent>

      <Typography.Text>
        Еще нет аккаунта? {' '}
        <NavLink to='/auth/register' className='text-blue-500'>Зарегистрироваться</NavLink>
      </Typography.Text>
    </Card>
  </>
}