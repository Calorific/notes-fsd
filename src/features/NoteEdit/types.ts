import { Note } from '../../shared/api/notes.ts'

export interface NoteEditProps {
  note: Note
  onModeChange: () => void
}