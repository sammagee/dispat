import axios from '@/lib/axios'

export default function useJobs() {
  const addAssigneeToJob = async (jobId, assigneeId) => {
    await axios.post(`/api/jobs/${jobId}/assignees`, { id: assigneeId })
  }

  const addLocomotiveToJob = async (jobId, locomotiveId) => {
    await axios.post(`/api/jobs/${jobId}/locomotives`, { id: locomotiveId })
  }

  const removeJob = async jobId => {
    if (confirm('Are you sure you want to delete this job?')) {
      await axios.delete(`/api/jobs/${jobId}`)
    }
  }

  const removeJobLocomotive = async (jobId, locomotiveId) => {
    await axios.delete(`/api/jobs/${jobId}/locomotives/${locomotiveId}`)
  }

  const removeJobAssignee = async (jobId, assigneeId) => {
    await axios.delete(`/api/jobs/${jobId}/assignees/${assigneeId}`)
  }

  const updateJob = async (jobId, data) => {
    await axios.put(`/api/jobs/${jobId}`, data)
  }

  return {
    addAssigneeToJob,
    addLocomotiveToJob,
    removeJob,
    removeJobLocomotive,
    removeJobAssignee,
    updateJob,
  }
}
