import React, { ButtonHTMLAttributes, HTMLInputTypeAttribute } from 'react'
import * as yup from 'yup'

export interface Target {
  name: string
  value: string
}

export type SubmitData = { [key: string]: string }
export type Errors = { [key: string]: string }

export interface FormProps {
  className?: string
  onSubmit: (data: SubmitData) => Promise<Errors | void>
  clear?: boolean
  defaultData?: SubmitData
  validationScheme?: yup.AnyObjectSchema
}

export interface FormButtonElement {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  disabled?: boolean
}

export interface FormInputElement {
  name: string
  onChange?: (target: Target) => void
  type?: HTMLInputTypeAttribute
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  disabled?: boolean
  value?: string
}