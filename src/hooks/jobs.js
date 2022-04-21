import axios from '@/lib/axios'

export default function useJobs() {
  const removeJob = async id => {
    if (confirm('Are you sure you want to delete this job?')) {
      await axios.delete(`/api/jobs/${id}`)
    }
  }

  const removeJobLocomotive = async (jobId, locomotiveId) => {
    await axios.delete(`/api/jobs/${jobId}/locomotives/${locomotiveId}`)
  }

  const removeJobAssignee = async (jobId, assigneeId) => {
    await axios.delete(`/api/jobs/${jobId}/assignees/${assigneeId}`)
  }

  return { removeJob, removeJobLocomotive, removeJobAssignee }
}
