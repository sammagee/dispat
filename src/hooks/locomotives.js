import axios from '@/lib/axios'
import useSWR from 'swr'

export default function useLocomotives() {
  const { data: locomotives, error, mutate: refetch } = useSWR(
    '/api/locomotives',
    () =>
      axios
        .get('/api/locomotives')
        .then(res => res.data)
        .catch(error => {}),
  )

  return { locomotives, refetch }
}
