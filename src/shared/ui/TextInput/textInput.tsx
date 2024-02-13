import React, { ChangeEvent, FC } from 'react'
import { TextInputProps } from './types'
import { Input, Typography } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'


const _textInput: FC<TextInputProps> = ({
  error = '',
  placeholder = '',
  type = 'text',
  name,
  onChange,
  onKeyDown,
  value = '',
  className
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      onChange({ name: e.target.name, value: e.target.value })
    }
  }

  return (
    <div className='w-full mb-2.5'>
      {type === 'password'
          ? <Input.Password type={type} status={error ? 'error' : undefined} onChange={handleChange}
                            placeholder={placeholder}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onKeyDown={onKeyDown} value={value} name={name} className={className || ''} size='large' />
          : <Input type={type} status={error ? 'error' : undefined} onChange={handleChange} placeholder={placeholder}
              onKeyDown={onKeyDown} value={value} name={name} className={className || ''} size="large" />}
      {error && <Typography.Text type='danger'>{error}</Typography.Text>}
    </div>
  )
}

export const TextInput = React.memo(_textInput)