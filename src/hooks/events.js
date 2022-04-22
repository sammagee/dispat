import { useEffect } from 'react'

export default function useEvents({ callback }) {
  useEffect(() => {
    Echo.channel('board')
      .listen(`.board.deleted`, e => {
        callback()
      })
      .listen(`.job.created`, e => {
        callback()
      })
      .listen(`.job.deleted`, e => {
        callback()
      })
      .listen(`.job.updated`, e => {
        callback()
      })
      .listen(`.job.locomotive-deleted`, e => {
        callback()
      })
      .listen(`.job.assignee-deleted`, e => {
        callback()
      })
      .error(error => console.log('echo:error', error))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
