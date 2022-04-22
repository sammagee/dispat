import useEvent from '@/hooks/event'
import useJobs from '@/hooks/jobs'
import useLocomotives from '@/hooks/locomotives'
import useWorkers from '@/hooks/workers'
import Autocomplete from './Autocomplete'
import Item from './Item'

export default function Job({ job, refetch }) {
  const { removeJob, removeJobLocomotive, removeJobAssignee } = useJobs()
  const { locomotives } = useLocomotives()
  const { workers } = useWorkers()

  const addLocomotive = val => console.log(val)
  const addAssignee = val => console.log(val)

  useEvent({
    channel: 'board',
    event: 'job.deleted',
    callback: e => {
      refetch()
    },
  })

  useEvent({
    channel: 'board',
    event: 'job.locomotive-deleted',
    callback: e => {
      refetch()
    },
  })

  useEvent({
    channel: 'board',
    event: 'job.assignee-deleted',
    callback: e => {
      refetch()
    },
  })

  return (
    <div className="w-full p-4 bg-gray-200 min-w-[20rem] max-w-sm rounded space-y-6 snap-center relative group">
      <header>
        <h2 className="text-lg font-medium text-gray-600">{job.name}</h2>

        <button
          className="absolute inline-flex items-center justify-center w-5 h-5 text-gray-500 bg-gray-200 rounded-full opacity-0 -top-2 -right-2 hover:bg-gray-300 group-hover:opacity-100"
          onClick={() => removeJob(job.id)}>
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </header>

      <div>
        <header className="flex items-center justify-between pb-3 mb-3 border-b border-gray-300">
          <h3 className="text-sm font-medium tracking-wide text-gray-700 uppercase ">
            Locomotives
          </h3>

          <Autocomplete
            placeholder="Search for a locomotive..."
            button={
              <button className="flex items-center justify-end flex-1">
                <div className="flex items-center space-x-0.5 text-gray-600">
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs font-medium tracking-wide uppercase">
                    Add
                  </span>
                </div>
              </button>
            }
            items={locomotives?.map(locomotive => ({
              append: locomotive.direction[0].toUpperCase(),
              display: locomotive.name,
              value: locomotive.id,
            }))}
            onChange={addLocomotive}
          />
        </header>
        <div className="space-y-2">
          {job.locomotives.length > 0 ? (
            job.locomotives.map(locomotive => (
              <Item key={locomotive.id}>
                <div className="flex items-center justify-between flex-1">
                  <p className="font-medium text-gray-900">{locomotive.name}</p>
                  <span className="inline-flex items-center justify-center pl-6 font-mono text-sm font-medium text-gray-700 border-l border-gray-200">
                    {locomotive.direction[0].toUpperCase()}
                  </span>
                </div>

                <button
                  className="absolute inline-flex items-center justify-center w-5 h-5 text-gray-500 bg-gray-200 rounded-full opacity-0 -top-2 -right-2 hover:bg-gray-300 group-1-hover:opacity-100"
                  onClick={() => removeJobLocomotive(job.id, locomotive.id)}>
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Item>
            ))
          ) : (
            <Item disabled invert>
              <p className="flex-1 text-sm font-medium text-center text-gray-700">
                No locomotives added.
              </p>
            </Item>
          )}
        </div>
      </div>
      <div>
        <header className="flex items-center justify-between pb-3 mb-3 border-b border-gray-300">
          <h3 className="text-sm font-medium tracking-wide text-gray-700 uppercase ">
            Assignees
          </h3>

          <Autocomplete
            placeholder="Search for a worker..."
            button={
              <button className="flex items-center justify-end flex-1">
                <div className="flex items-center space-x-0.5 text-gray-600">
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs font-medium tracking-wide uppercase">
                    Add
                  </span>
                </div>
              </button>
            }
            items={workers?.map(worker => ({
              append: worker.role[0].toUpperCase(),
              display: `${worker.last_name}, ${worker.first_name}`,
              value: worker.id,
            }))}
            onChange={addAssignee}
          />
        </header>
        <div className="space-y-2">
          {job.assignees.length > 0 ? (
            job.assignees.map(assignee => (
              <Item key={assignee.id}>
                <div className="flex items-center justify-between flex-1">
                  <p className="font-medium text-gray-900">
                    {assignee.first_name} {assignee.last_name}
                  </p>
                  <span className="inline-flex items-center justify-center pl-6 font-mono text-sm font-medium text-gray-700 border-l border-gray-200">
                    {assignee.role[0].toUpperCase()}
                  </span>
                </div>

                <button
                  className="absolute inline-flex items-center justify-center w-5 h-5 text-gray-500 bg-gray-200 rounded-full opacity-0 -top-2 -right-2 hover:bg-gray-300 group-1-hover:opacity-100"
                  onClick={() => removeJobAssignee(job.id, assignee.id)}>
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Item>
            ))
          ) : (
            <Item disabled invert>
              <p className="flex-1 text-sm font-medium text-center text-gray-700">
                No assignees added.
              </p>
            </Item>
          )}
        </div>
      </div>
    </div>
  )
}
