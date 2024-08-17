import { Node } from '@tiptap/core'

export const CustomHeading = Node.create({
  name: 'heading',

  // Define os níveis dos headings
  addOptions() {
    return {
      levels: [1, 2, 3],
    }
  },

  content: 'inline*',
  group: 'block',
  defining: true,
  draggable: false,

  // Define os atributos que serão utilizados no nó
  addAttributes() {
    return {
      level: {
        default: 1,
      },
      id: {
        default: Math.random().toString(36).substr(2, 9),
        parseHTML: (element) => element.getAttribute('id'),
        renderHTML: (attributes) => {
          console.log('custom heading', attributes)
          return {
            id:
              attributes?.id ||
              attributes?.textContent.replace(/\s+/g, '-').toLowerCase(),
          }
        },
      },
    }
  },

  parseHTML() {
    return this.options.levels.map((level) => ({
      tag: `h${level}`,
      getAttrs: (node) => (node instanceof HTMLElement ? { level } : false),
    }))
  },

  renderHTML({ node, HTMLAttributes }) {
    const id =
      node.attrs.id || node.textContent.replace(/\s+/g, '-').toLowerCase()
    return [`h${node.attrs.level}`, { ...HTMLAttributes, id }, 0]
  },

  addCommands() {
    return {
      setHeading:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph', attributes)
        },
    }
  },

  addKeyboardShortcuts() {
    return this.options.levels.reduce((items, level) => {
      return {
        ...items,
        [`Mod-Alt-${level}`]: () => this.editor.commands.setHeading({ level }),
      }
    }, {})
  },
})
