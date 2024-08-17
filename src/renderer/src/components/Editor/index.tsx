import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export interface OnContentUpdatedParams {
  title: string
  content: string
  headings: { id: string; text: string; level: number }[]
}

interface EditorProps {
  content: string
  onContentUpdated: (params: OnContentUpdatedParams) => void
}

export function Editor({ content, onContentUpdated }: EditorProps) {
  const editor = useEditor({
    extensions: [
      Document.extend({
        content: 'heading block*',
      }),
      StarterKit.configure({
        document: false,
      }),
      // CustomHeading.configure({ levels: [1, 2, 3] }),
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: 'Untitled',
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none',
      }),
      // Headers,
    ],
    onUpdate: ({ editor }) => {
      // const contentRegex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/
      const contentRegex = /<h1>(?<title>.*?)<\/h1>(?<content>.+)?/
      const parsedContent = editor.getHTML().match(contentRegex)?.groups

      const title = parsedContent?.title ?? 'Untitled'
      const content = parsedContent?.content ?? ''

      const headings: { id: string; text: string; level: number }[] = []
      editor.state.doc.descendants((node) => {
        if (node.type.name.startsWith('heading')) {
          const level = node.attrs.level
          const text = node.textContent
          const id = node.attrs.id

          headings.push({ id, text, level })
        }
      })

      onContentUpdated({
        title,
        content,
        headings,
      })
    },
    content,
    autofocus: 'end',
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose prose-invert prose-headings:mt-0',
      },
    },
  })

  return <EditorContent className="w-[65ch]" editor={editor}></EditorContent>
}
