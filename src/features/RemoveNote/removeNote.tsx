import { FC, useState } from 'react'
import { Button, Modal } from 'antd'
import { RemoveNoteProps } from './types.ts'
import { useNotes } from '../../shared/context/Notes/notesContext.ts'

export const RemoveNote: FC<RemoveNoteProps> = ({ noteId }) => {
  const notes = useNotes()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleDelete = () => {
    notes?.removeNote(noteId)
  }

  return <>
    <Button danger onClick={() => setIsModalOpen(true)}>Удалить</Button>

    <Modal
        title="Удаление заметки"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsModalOpen(false)}
        okText="Удалить"
        cancelText="Отмена"
    >
      Вы уверены, что хотите удалить текущую заметку?
    </Modal>
  </>
}
