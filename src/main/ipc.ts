import { ipcMain } from 'electron'

ipcMain.handle('fetch-documents', async () => {
  return [
    {
      id: 1,
      title: 'Document 1',
      content: 'This is the content of document 1',
    },
    {
      id: 2,
      title: 'Document 2',
      content: 'This is the content of document 2',
    },
  ]
})
