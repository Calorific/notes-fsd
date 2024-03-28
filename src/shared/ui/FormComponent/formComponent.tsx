import React, { FC, FormEvent, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react'
import { SubmitData, FormInputElement, FormButtonElement, FormProps, Target, Errors } from './types'
import { ValidationError } from 'yup'

const Form: FC<PropsWithChildren<FormProps>> = ({ children, className, onSubmit,
                                                  defaultData, clear = false,
                                                  validationScheme }) => {
  const form = useRef<HTMLFormElement | null>(null)
  const [data, setData] = useState<SubmitData>(defaultData || {})
  const [errors, setErrors] = useState<Errors>({})
  const isFirstRender = useRef<boolean>(true)

  const handleChange = useCallback((target: Target) => {
    setData((prevState : SubmitData) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }, [setData])


  const validate = useCallback((data: SubmitData) => {
    if (!validationScheme) return true

    try {
      validationScheme.validateSync(data)
      setErrors({})
      return true
    } catch (error) {
      const e = error as ValidationError
      if (e.path)
        setErrors({ [e.path]: e.message })
      return false
    }
  }, [validationScheme, setErrors])

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate(data))
      return

    const errors = await onSubmit(data)

    if (errors)
      setErrors(errors)
    else if (clear)
      setData(defaultData || {})
  }

  useEffect(() => {
    if (isFirstRender.current)
      isFirstRender.current = false
    else if (Object.keys(data).length > 0)
      validate(data)
  }, [data, validate])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      const form = (e.target as HTMLInputElement).form
      const indexField = Array.prototype.indexOf.call(form, e.target);
      (form?.elements[(indexField + 1) % form.elements.length] as HTMLElement)?.focus()
    }
  }, [])

  const clonedElements = React.Children.map(children, child => {
    if (typeof child !== 'object' || !React.isValidElement<FormInputElement>(child)
        || !React.isValidElement<FormButtonElement>(child)) return child

    if (child.props.name) {
      const config = {
        ...child.props,
        onChange: handleChange,
        value: data[child.props.name] || '',
        error: errors[child.props.name] || '',
        onKeyDown: handleKeyDown
      }
      return React.cloneElement(child, config)
    }

    if (React.isValidElement<FormButtonElement>(child)) {
      const config = { ...child.props, disabled: !isValid }
      return React.cloneElement(child, config)
    }

    return child
  })

  return (
      <form onSubmit={handleSubmit} className={className} ref={form}>
        {clonedElements}
      </form>
  )
}

export const FormComponent = React.memo(Form)