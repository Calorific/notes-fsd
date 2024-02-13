import { FC, memo } from 'react'
import { Typography } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import 'github-markdown-css/github-markdown-light.css'
import { NotePreviewProps } from './types.ts'
import './styles.css'
import { RemoveNote } from '../RemoveNote/removeNote.tsx'

export const NotePreview: FC<NotePreviewProps> = memo(({ note, onModeChange }) => {
  const parsed = marked.parse(note?.text || '', { async: false }) as string
  const __html = DOMPurify.sanitize(parsed)

  return <>
    <div className='flex px-12 justify-between mt-2 items-center'>
      <Typography.Text>
        {new Date(note?.updatedAt || 0).toLocaleString()} {' '}
        <EditOutlined className='cursor-pointer hover:text-gray-500 transition-colors' onClick={onModeChange} />
      </Typography.Text>
      <RemoveNote noteId={note.id} />
    </div>


    {__html
      ? <div className="markdown-body" dangerouslySetInnerHTML={{ __html }}></div>
      : <Typography.Title level={4} className='px-4'>Заметка пуста</Typography.Title>}
  </>
})
