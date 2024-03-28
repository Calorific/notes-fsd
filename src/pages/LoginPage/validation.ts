import * as yup from 'yup'
import { LogInData } from './types'

const passwordMinLength = 8

export const logInValidationScheme: yup.ObjectSchema<LogInData> = yup.object().shape({
  password: yup.string()
      .required('Пароль обязателен для заполнения')
      .matches(/(?=.*[A-Z])/, 'Должна быть хотя бы одна заглавная буква')
      .matches(/(?=.*[0-9])/, 'Должно быть хотя бы одно число')
      .min(passwordMinLength, `Пароль не должен быть меньше ${passwordMinLength} символов`),
  email: yup.string()
      .required('Email обязателен для заполнения')
      .matches(/^\S+@\S+\.\S+$/g, 'Некорректный email')
})