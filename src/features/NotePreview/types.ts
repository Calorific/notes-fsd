import { Note } from '../../shared/api/notes.ts'

export interface NotePreviewProps {
  note: Note
  onModeChange: () => void
}