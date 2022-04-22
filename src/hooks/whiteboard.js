import axios from '@/lib/axios'
import useSWR from 'swr'

export default function useWhiteboard() {
  const { data: boards, error, mutate: refetch } = useSWR('/api/boards', () =>
    axios
      .get('/api/boards')
      .then(res => res.data)
      .catch(error => {}),
  )

  const createBoard = async () => {
    await axios.post(`/api/boards`)
  }

  const createJob = async boardId => {
    await axios.post(`/api/boards/${boardId}/jobs`)
  }

  const removeBoard = async (boardId, selectedBoard, setSelectedBoard) => {
    if (confirm('Are you sure you want to delete this board?')) {
      await axios.delete(`/api/boards/${boardId}`)

      if (selectedBoard === 0) setSelectedBoard(0)
      else setSelectedBoard(selectedBoard - 1)
    }
  }

  const updateBoard = async (boardId, data) => {
    await axios.put(`/api/boards/${boardId}`, data)
  }

  return { boards, createBoard, createJob, removeBoard, refetch, updateBoard }
}
