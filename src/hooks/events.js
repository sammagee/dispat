import { useEffect, useState } from 'react'

export default function useEvents({ callback }) {
  const [viewingUsers, setViewingUsers] = useState([])
  const callbackFn = e => {
    callback()
  }

  useEffect(() => {
    Echo.join('board')
      .here(users => setViewingUsers(users))
      .joining(user => setViewingUsers(prev => [...prev, user]))
      .leaving(user =>
        setViewingUsers(prev => prev.filter(u => u.id !== user.id)),
      )
      .listen(`.board.created`, callbackFn)
      .listen(`.board.deleted`, callbackFn)
      .listen(`.board.updated`, callbackFn)
      .listen(`.job.created`, callbackFn)
      .listen(`.job.deleted`, callbackFn)
      .listen(`.job.updated`, callbackFn)
      .listen(`.job.assignee-created`, callbackFn)
      .listen(`.job.assignee-deleted`, callbackFn)
      .listen(`.job.locomotive-created`, callbackFn)
      .listen(`.job.locomotive-deleted`, callbackFn)
      .error(error => console.log('echo:error', error))

    return () => Echo.leave('board')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { viewingUsers }
}
