import { FC, useState } from 'react'
import { Button, Card, Typography } from 'antd'
import { FormComponent } from '../../shared/ui/FormComponent/formComponent.tsx'
import { TextInput } from '../../shared/ui/TextInput/textInput.tsx'
import { NavLink, useNavigate } from 'react-router-dom'
import { SubmitData } from '../../shared/ui/FormComponent/types.ts'
import { signUpValidationScheme } from './validation.ts'
import { Loader } from '../../shared/ui/Loader/loader.tsx'
import { useAuth } from '../../shared/context/Auth/authContext.ts'

export const RegisterPage: FC = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const [loading, setLoading] = useState<boolean>(false)

  const handleRegister = async (data: SubmitData) => {
    setLoading(true)
    const err = await auth?.signUp(data.email, data.password)
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
      <Typography.Title level={2}>Регистрация</Typography.Title>

      <FormComponent onSubmit={handleRegister} className='mb-2' validationScheme={signUpValidationScheme}>
        <TextInput name='email' placeholder='Email' />
        <TextInput name='password' type='password' placeholder='Пароль' />
        <TextInput name='repeatPassword' type='password' placeholder='Повторите пароль' />
        <Button htmlType='submit'>Войти</Button>
      </FormComponent>

      <Typography.Text>
        Уже есть аккаунт? {' '}
        <NavLink to='/auth/login' className='text-blue-500'>Войти</NavLink>
      </Typography.Text>
    </Card>
  </>
}