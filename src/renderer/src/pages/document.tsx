import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Document as DocumentRotion } from 'src/shared/types/ipc'
import { Editor, OnContentUpdatedParams } from '../components/Editor'
import { ToC } from '../components/ToC'

export function Document() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery({
    queryKey: ['document', id],
    queryFn: async () => {
      const response = await window.api.fetchDocument({ id: id! })
      return response.data
    },
  })

  const initialCoontent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`
    }

    return ''
  }, [data])

  const { mutateAsync: saveDocument } = useMutation({
    mutationFn: async ({ title, content }: OnContentUpdatedParams) => {
      await window.api.saveDocument({
        id: id!,
        title,
        content,
      })
    },
    onSuccess: (_, { title }) => {
      queryClient.setQueryData<DocumentRotion[]>(['documents'], (documents) => {
        return documents?.map((document) => {
          if (document.id === id) {
            return { ...document, title }
          }

          return document
        })
      })
    },
  })

  function handleEditorContentUpdated({
    content,
    title,
  }: OnContentUpdatedParams) {
    saveDocument({ content, title })
  }

  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky">
        <span className="text-rotion-300 font-semibold text-xs">
          TABLE OF CONTENTS
        </span>
        <ToC.Root>
          <ToC.Link>backend</ToC.Link>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        {!isFetching && data && (
          <Editor
            onContentUpdated={handleEditorContentUpdated}
            content={initialCoontent}
          />
        )}
      </section>
    </main>
  )
}
