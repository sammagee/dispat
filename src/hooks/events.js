import { useEffect } from 'react'

export default function useEvents({ callback }) {
  const callbackFn = e => {
    callback()
  }

  useEffect(() => {
    Echo.channel('board')
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
}
