import { createContext, useContext } from 'react'
import { NotesContextValue } from './types.ts'

export const NotesContext = createContext<NotesContextValue | null>(null)

export function useNotes() {
  return useContext(NotesContext)
}