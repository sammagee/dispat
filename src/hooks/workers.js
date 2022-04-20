import axios from '@/lib/axios'
import useSWR from 'swr'

export default function useWorkers() {
    const { data: workers, error, mutate: refetch } = useSWR(
        '/api/workers',
        () =>
            axios
                .get('/api/workers')
                .then(res => res.data)
                .catch(error => {}),
    )

    return { workers, refetch }
}
