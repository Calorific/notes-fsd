import { Note } from '../../api/notes.ts'

export interface NotesContextValue {
  notes: Note[] | null
  selectedNote: Note | null,
  setSelectedNote: (newNote: Note | null) => void
  loading: boolean
  addNote: (title: string) => void
  updateNote: (id: string, text: string) => void
  removeNote: (id: string) => void
}