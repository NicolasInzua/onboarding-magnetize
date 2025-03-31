import { useState } from 'react'
import './App.css'
import {
  useEditNoteMutation,
  useGetNotesQuery,
  usePostNoteMutation,
} from './services/notes'

const App = () => {
  const { data: notes = [], isLoading } = useGetNotesQuery()
  const [postNote, { isLoading: isLoadingMutation }] = usePostNoteMutation()
  const [editNote, { isLoading: isLoadingEditMutation }] = useEditNoteMutation()
  const [isEditing, setIsEditing] = useState(false)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const title = form.elements.namedItem('title') as HTMLInputElement
    const description = form.elements.namedItem(
      'description',
    ) as HTMLInputElement

    if (!title.value || !description.value) {
      return
    }

    postNote({ title: title.value, description: description.value })
  }

  const handleEditNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const id = form.elements.namedItem('id') as HTMLInputElement
    const title = form.elements.namedItem('title') as HTMLInputElement
    const description = form.elements.namedItem(
      'description',
    ) as HTMLInputElement

    if (!title.value || !description.value) {
      return
    }

    setIsEditing(false)
    editNote({
      id: id.value,
      title: title.value,
      description: description.value,
    })
  }

  return (
    <div>
      <header>
        <h1>Magnetize Onboarding</h1>
      </header>
      <main className="users-container">
        <section>
          {isLoading || isLoadingEditMutation || isLoadingMutation ? (
            <p>Loading...</p>
          ) : (
            <ul style={{ listStyleType: 'none' }}>
              {notes.map((user: any) => (
                <li
                  key={user.id}
                  onClick={() => setIsEditing(true)}
                  style={{ cursor: 'pointer' }}
                >
                  {isEditing ? (
                    <form onSubmit={handleEditNote}>
                      <input type="hidden" name="id" value={user.id} />
                      <input
                        type="text"
                        name="title"
                        defaultValue={user.title}
                      />
                      <textarea
                        name="description"
                        defaultValue={user.description}
                      />
                      <button type="submit">Save</button>
                    </form>
                  ) : (
                    <>
                      <h2>{user.title}</h2>
                      <p>{user.description}</p>
                      <span>Creado en: {user.createdAt}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
        <section style={{ background: '#4166d5', color: 'white' }}>
          <h2>Create a new note</h2>
          <form onSubmit={onSubmit} className="form-container">
            <label>
              Title:
              <input type="text" name="title" />
            </label>
            <label>
              Description:
              <input type="text" name="description" />
            </label>
            <button type="submit" disabled={isLoadingMutation}>
              Create user
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App
