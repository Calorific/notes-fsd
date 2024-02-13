import { getDatabase, ref, get, set, push } from 'firebase/database'

export interface Note {
  title: string
  text: string
  updatedAt: number
  id: string
}

export const FetchNotes = async (uid: string): Promise<Note[] | string> => {
  try {
    const db = getDatabase()

    const snapshot = await get(ref(db, `notes/${uid}/`))

    if (snapshot.exists()) {
      const data = snapshot.val()
      return Object.keys(data).map(id => ({ ...data[id], id }))
    }

    return []
  } catch (e: unknown) {
    return (e as Error).name
  }
}

export const AddNote = async (uid: string, title: string): Promise<Note | string> => {
  try {
    const db = getDatabase()

    const data = { title, text: '', updatedAt: Date.now() }

    const { key } = await push(ref(db, `notes/${uid}`), data)

    if (!key)
      return 'PUSH_ERROR'

    return { ...data, id: key }
  } catch (e) {
    return (e as Error).name
  }
}

export const UpdateNote = async (uid: string, note: Note): Promise<null | string> => {
  try {
    const db = getDatabase()

    await set(ref(db, `notes/${uid}/${note.id}`), {
      title: note.title,
      text: note.text,
      updatedAt: note.updatedAt
    })

    return null
  } catch (e: unknown) {
    return (e as Error).name
  }
}

export const RemoveNote = async (uid: string, noteId: string): Promise<null | string> => {
  try {
    const db = getDatabase()

    await set(ref(db, `notes/${uid}/${noteId}`), null)
    return null
  } catch (e: unknown) {
    return (e as Error).name
  }
}