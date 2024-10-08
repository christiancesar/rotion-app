import { ipcMain } from 'electron'
import {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  Document as DocumentRotion,
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  SaveDocumentRequest,
} from '../shared/types/ipc.js'
import { IPC } from '../shared/constants/ipc.js'
import { store } from './store.js'
import { randomUUID } from 'node:crypto'

ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (): Promise<FetchAllDocumentsResponse> => {
    return {
      data: Object.values(store.get('documents')),
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.FETCH,
  async (_, { id }: FetchDocumentRequest): Promise<FetchDocumentResponse> => {
    const document = store.get<string, DocumentRotion>(`documents.${id}`)

    return {
      data: document,
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.CREATE,
  async (): Promise<CreateDocumentResponse> => {
    const id = randomUUID()

    const document: DocumentRotion = {
      id,
      title: 'Untitled',
    }

    store.set(`documents.${id}`, document)
    return {
      data: document,
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.SAVE,
  async (
    _,
    { id, title, content, headings }: SaveDocumentRequest,
  ): Promise<void> => {
    store.set(`documents.${id}`, { id, title, content, headings })
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  async (_, { id }: DeleteDocumentRequest): Promise<void> => {
    // @ts-expect-error @ts-ignore (https://github.com/sindresorhus/electron-store/issues/196)
    store.delete(`documents.${id}`)
  },
)
