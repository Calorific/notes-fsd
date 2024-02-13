import { FC, useState } from 'react'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Modal, Typography } from 'antd'
import { TextInput } from '../../shared/ui/TextInput/textInput.tsx'
import { noteValidationScheme } from './validation.ts'
import { ValidationError } from 'yup'
import { useNotes } from '../../shared/context/Notes/notesContext.ts'

export const AddNote: FC = () => {
  const notesContext = useNotes()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string>('')

  const validate = (value: string) => {
    try {
      noteValidationScheme.validateSync({ title: value })
      return true
    } catch (e) {
      setError((e as ValidationError).errors[0])
      return false
    }
  }

  const handleOk = () => {
    if (!validate(title))
      return

    setIsModalOpen(false)
    notesContext?.addNote(title)
  }

  const handleCancel = () => {
    setError('')
    setTitle('')
    setIsModalOpen(false)
  }

  const handleChange = ({ value }:  { value: string }) => {
    setError('')

    validate(value)

    setTitle(value)
  }

  return <>
    <PlusCircleOutlined
        className="text-lg cursor-pointer hover:text-gray-600 transition-colors"
        onClick={() => setIsModalOpen(true)} />

    <Modal
        title="Добавить заметку"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Создать"
        cancelText="Отмена"
        okButtonProps={{ disabled: !!error }}
    >
      <Typography.Title level={5}>Название</Typography.Title>
      <TextInput name='title' value={title} error={error} onChange={handleChange} placeholder='Новая заметка' />
    </Modal>
  </>
}
