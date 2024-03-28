import { ChangeEvent, FC, useState } from 'react'
import { Input, List, Typography } from 'antd'
import removeMarkdown from 'markdown-to-text'
import { useNotes } from '../../shared/context/Notes/notesContext.ts'
import DOMPurify from 'dompurify'
import { SearchOutlined } from '@ant-design/icons'
import { AddNote } from '../../features/AddNote/addNote.tsx'


const getPreviewText = (text: string) => {
  return DOMPurify.sanitize(removeMarkdown(text.substring(0, 30))) || 'Заметка пуста'
}

const getTimeString = (updatedAt: number) => {
  const date = new Date(updatedAt)

  if (new Date().getDate() === date.getDate())
    return date.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })

  return date.toLocaleDateString()
}

export const NotesList: FC = () => {
  const notesContext = useNotes()
  const [search, setSearch] = useState<string>('')

  if (!notesContext?.notes || notesContext?.notes?.length === 0)
    return <Typography.Text className='px-1'>Заметок еще нет</Typography.Text>


  const sorted = notesContext.notes.sort((a, b) => b.updatedAt - a.updatedAt)
  const filtered = sorted.filter(n =>
      (n.title + n.text).toLowerCase().includes(search.toLowerCase())
  )

  return <>
    <div className='p-2 flex gap-x-1'>
      <Input value={search} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
             size="small" placeholder="Поиск" prefix={<SearchOutlined />} />
      <AddNote />
    </div>
    <List
        dataSource={filtered}
        renderItem={item => (
            <li
                className={(item.id === notesContext?.selectedNote?.id ? 'bg-gray-200' : '') +
                    ' min-w-[180px] border-0 border-b border-solid border-b-gray-300 px-4 py-2 cursor-pointer select-none'}
                key={item.id}
                onClick={() => notesContext?.setSelectedNote(item)}
            >
              <Typography.Text className='font-bold block truncate'>
                {item.title}
              </Typography.Text>

              <div className='w-full truncate'>
                <Typography.Text>
                  {getTimeString(item.updatedAt)}
                </Typography.Text>

                <span className='w-full pl-2 text-gray-400'
                      dangerouslySetInnerHTML={{ __html: getPreviewText(item.text)}}></span>
              </div>
            </li>
        )}
    />
  </>
}