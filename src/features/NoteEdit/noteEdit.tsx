import { FC } from 'react'
import { NoteEditProps } from './types.ts'
import SimpleMdeReact from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useNotes } from '../../shared/context/Notes/notesContext.ts'
import { Button } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

export const NoteEdit: FC<NoteEditProps> = ({ note, onModeChange }) => {

  const handleChange = useNotes()?.updateNote

  return <>
    <div className='flex justify-center py-4'>
      <Button className='align-middle' onClick={onModeChange}>
        Сохранить
        <span className='pl-1'><CheckOutlined className='' /></span>
      </Button>
    </div>

    <SimpleMdeReact value={note?.text} onChange={(value: string) => handleChange?.(note.id, value)} />
  </>
}
