import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../services/users'

const useUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  return { data: data?.record.users, isLoading }
}

export default useUsers
