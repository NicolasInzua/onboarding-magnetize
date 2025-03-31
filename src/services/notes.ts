import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store/store'

const API_JSON_SERVER = process.env.API_JSON_SERVER
const X_ACCESS_KEY = process.env.X_ACCESS_KEY

if (!API_JSON_SERVER || !X_ACCESS_KEY) {
  throw new Error('API_JSON_SERVER and X_ACCESS_KEY must be provided')
}

interface Note {
  id: string
  title: string
  description: string
  createdAt: string
}

type NotesResponse = {
  record: {
    users: Note[]
  }
}

const prepareHeaders = (headers: Headers) => {
  headers.set('X-Access-Key', X_ACCESS_KEY)
  return headers
}

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_JSON_SERVER, prepareHeaders }),
  tagTypes: ['Notes'],
  endpoints: (build) => ({
    getNotes: build.query<Note[], void>({
      query: () => '',
      transformResponse: (response: NotesResponse) => response.record.users,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Notes' as const, id })),
              'Notes',
            ]
          : ['Notes'],
    }),
    postNote: build.mutation<Note, Omit<Note, 'id' | 'createdAt'>>({
      invalidatesTags: ['Notes'],
      queryFn: async (newNoteData, queryApi, _, baseQuery) => {
        const { getState, dispatch } = queryApi
        const state = getState() as RootState

        const getNotesPreviousResult =
          notesApi.endpoints.getNotes.select()(state) || []

        let previousNotes: Note[] = []
        if (getNotesPreviousResult.status === 'fulfilled') {
          previousNotes = getNotesPreviousResult.data
        }

        const newNote: Note = {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          ...newNoteData,
        }

        const newNotes = [...previousNotes, newNote]

        const requestBody = {
          users: newNotes,
        }

        const response = await baseQuery({
          url: '',
          method: 'PUT',
          body: requestBody,
        })

        if (response.error) {
          return {
            error: response.error,
          }
        }

        return { data: newNote }
      },
    }),
    editNote: build.mutation<Note, Omit<Note, 'createdAt'>>({
      invalidatesTags: (result, error, arg) => [{ type: 'Notes', id: arg.id }],
      queryFn: async (newNoteData, queryApi, _, baseQuery) => {
        const { getState, dispatch } = queryApi
        const state = getState() as RootState

        const getNotesPreviousResult =
          notesApi.endpoints.getNotes.select()(state) || []

        let previousNotes: Note[] = []
        if (getNotesPreviousResult.status === 'fulfilled') {
          previousNotes = getNotesPreviousResult.data
        }

        const newNotes = previousNotes.map((note) => {
          if (note.id === newNoteData.id) {
            return {
              ...note,
              ...newNoteData,
            }
          }
          return note
        })

        const requestBody = {
          users: newNotes,
        }

        const response = await baseQuery({
          url: '',
          method: 'PUT',
          body: requestBody,
        })

        if (response.error) {
          return {
            error: response.error,
          }
        }

        return {
          data: newNotes.find((note) => note.id === newNoteData.id) as Note,
        }
      },
    }),
  }),
})

export const { useGetNotesQuery, usePostNoteMutation, useEditNoteMutation } =
  notesApi
