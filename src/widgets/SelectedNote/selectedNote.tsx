import { FC, useEffect, useState } from 'react'
import { useNotes } from '../../shared/context/Notes/notesContext.ts'
import { NotePreview } from '../../features/NotePreview/notePreview.tsx'
import { NoteEdit } from '../../features/NoteEdit/noteEdit.tsx'

export const SelectedNote: FC = () => {
  const selectedNote = useNotes()?.selectedNote || null
  const [isEditing, setIsEditing] = useState<boolean>(false)

  useEffect(() => {
    setIsEditing(false)
  }, [selectedNote])

  if (selectedNote === null)
    return null

  if (!isEditing)
    return <NotePreview note={selectedNote} onModeChange={() => setIsEditing(true)} />

  return <NoteEdit note={selectedNote} onModeChange={() => setIsEditing(false)} />
}
