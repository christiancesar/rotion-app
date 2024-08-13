import { app, BrowserWindow, globalShortcut } from 'electron'

export function createShortcuts(windows: BrowserWindow) {
  app.on('browser-window-focus', () => {
    globalShortcut.register('CmdOrCtrl+N', () => {
      windows.webContents.send('new-document')
    })
  })

  app.on('browser-window-blur', () => {
    globalShortcut.unregisterAll()
  })
}
