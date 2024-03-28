import { FC } from 'react'
import { Layout } from 'antd'
import { NotesList } from '../../widgets/NotesList/notesList.tsx'
import { useNotes } from '../../shared/context/Notes/notesContext.ts'
import { Loader } from '../../shared/ui/Loader/loader.tsx'
import { SelectedNote } from '../../widgets/SelectedNote/selectedNote.tsx'

export const MainPage: FC = () => {
  const width = window.outerWidth
  const notesContext = useNotes()

  if (notesContext?.loading)
    return <div className='flex justify-center items-center min-h-full'>
      <Loader />
    </div>

  return <>
    <Layout className='bg-white relative'>
      <Layout.Sider
          theme='light'
          className={'z-[1000] ' + (width <= 575
              ? '!absolute border-0 border-r border-solid border-r-gray-300'
              : '!block')
          }
          breakpoint='sm'
          collapsedWidth={0}
          width='200px'
          zeroWidthTriggerStyle={{ top: 10, marginLeft: 5, border: '1px solid #d1d5db' }}
      >
        <NotesList />
      </Layout.Sider>
      <Layout.Content>
        <SelectedNote />
      </Layout.Content>
    </Layout>
  </>
}