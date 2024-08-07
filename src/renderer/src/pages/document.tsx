import { Editor } from '../components/Editor'
import { ToC } from '../components/ToC'

export function Document() {
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
        <Editor />
      </section>
    </main>
  )
}
