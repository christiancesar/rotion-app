import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Editor } from '../components/Editor'
import { ToC } from '../components/ToC'

export function Document() {
  const { id } = useParams<{ id: string }>()

  const { data, isFetching } = useQuery({
    queryKey: ['document', id],
    queryFn: async () => {
      const response = await window.api.fetchDocument({ id: id! })
      console.log(response)
      return response.data
    },
  })

  const initialCoontent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`
    }

    return ''
  }, [data])

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
        {!isFetching && data && <Editor content={initialCoontent} />}
      </section>
    </main>
  )
}
