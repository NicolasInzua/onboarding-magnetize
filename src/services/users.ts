import httpClient from './httpClient'

interface CreateUserRequest {
  name: string
  description: string
}

const postUser = async (bin: CreateUserRequest) => {
  console.log('postUser', bin)

  const newUser = {
    ...bin,
    id: crypto.randomUUID(),
  }
  await httpClient.post('', newUser)
  return newUser
}

const getUsers = async () => {
  const response = await httpClient.get('')
  return response.data
}

export { postUser, getUsers }
