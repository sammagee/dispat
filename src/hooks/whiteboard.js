import axios from '@/lib/axios'
import useSWR from 'swr'

export default function useWhiteboard() {
  const { data: boards, error, mutate: refetch } = useSWR('/api/boards', () =>
    axios
      .get('/api/boards')
      .then(res => res.data)
      .catch(error => {}),
  )

  const removeBoard = async (id, selectedBoard, setSelectedBoard) => {
    if (confirm('Are you sure you want to delete this board?')) {
      await axios.delete(`/api/boards/${id}`)
      refetch()

      if (selectedBoard === 0) setSelectedBoard(0)
      else setSelectedBoard(selectedBoard - 1)
    }
  }

  return { boards, removeBoard, refetch }
}
