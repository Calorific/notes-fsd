import { HTMLInputTypeAttribute } from 'react'
import { FormInputElement } from '../FormComponent/types'


export interface TextInputProps extends FormInputElement {
  error?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  name: string
  className?: string
}