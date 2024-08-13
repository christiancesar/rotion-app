import { BrowserWindow, Menu, Tray } from 'electron'
import path from 'node:path'
import icon from '../../resources/icon.ico?asset'

export function createTray(window: BrowserWindow) {
  const tray = new Tray(path.resolve(__dirname, icon))

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Criar um novo documento',
      click: () => {
        window.webContents.send('new-document')
      },
    },
    { type: 'separator' },
    // { label: 'Documentos recentes', enabled: false },
    // { label: 'Todo List' },
    { type: 'normal', role: 'quit' },
  ])
  tray.setToolTip('Rotion app')
  tray.setContextMenu(contextMenu)
}
