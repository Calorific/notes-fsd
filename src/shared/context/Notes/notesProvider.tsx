import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { NotesContextValue } from './types.ts'
import { NotesContext } from './notesContext.ts'
import { AddNote, FetchNotes, Note, RemoveNote, UpdateNote } from '../../api/notes.ts'
import { notification } from 'antd'
import { useAuth } from '../Auth/authContext.ts'
import { useNavigate } from 'react-router-dom'
import { debounce } from './utils.ts'

const showError = (title: string, description: string) => {
  notification.error({
    message: title,
    description,
    placement: 'topRight'
  })
}

const debouncedUpdateNote = debounce(UpdateNote, 1000)

export const NotesProvider: FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuth()
  const navigate = useNavigate()
  const [notes, setNotes] = useState<Note[] | null>(null)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const checkAuth = useCallback(() => {
    if (!auth?.uid) {
      showError('Ошибка!', 'Войдите в систему')
      navigate('/auth/login')
      return false
    }
    return true
  }, [navigate, auth])

  useEffect(() => {
    (async () => {
      if (!checkAuth())
        return

      const data = await FetchNotes(auth!.uid!)
      if (typeof data === 'string') {
        showError('Ошибка!', data)
        return
      }

      setNotes(data)
      setLoading(false)
    })()
  }, [auth, checkAuth])

  const addNote = async (title: string) => {
    if (!checkAuth())
      return

    setLoading(true)

    const data = await AddNote(auth!.uid!, title)

    setLoading(false)

    if (typeof data === 'string') {
      showError('Ошибка!', 'Не удалось добавить заметку')
      return
    }

    setNotes(prevState => [data, ...(prevState || [])])
    setSelectedNote(data)
  }

  const updateNote = async (id: string, text: string) => {
    if (!checkAuth())
      return

    const newNote = notes?.find(n => n.id === id)
    if (!newNote) {
      showError('Ошибка!', 'Не удалось найти заметку')
      return
    }

    newNote.text = text
    newNote.updatedAt = Date.now()

    const error = await debouncedUpdateNote(auth!.uid!, newNote)

    if (typeof error === 'string') {
      showError('Ошибка!', 'Не удалось обновить заметку')
      return
    }

    setNotes([...notes!])
  }

  const removeNote = async (id: string) => {
    if (!checkAuth())
      return

    const note = notes?.find(n => n.id === id)
    if (!note) {
      showError('Ошибка!', 'Не удалось найти заметку')
      return
    }

    setLoading(true)
    const error = await RemoveNote(auth!.uid!, id)

    if (typeof error === 'string') {
      showError('Ошибка!', 'Не удалось удалить заметку')
      return
    }

    setNotes(prevState => (prevState || [])?.filter(n => n.id !== id))
    setSelectedNote(null)
    setLoading(false)
  }

  const value: NotesContextValue = {
    notes,
    selectedNote,
    setSelectedNote,
    loading,
    addNote,
    updateNote,
    removeNote
  }

  return <NotesContext.Provider value={value}>
    {children}
  </NotesContext.Provider>
}