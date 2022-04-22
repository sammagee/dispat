import { useEffect } from 'react'

export default function useEvent({ channel, event, callback }) {
  useEffect(() => {
    Echo.channel(channel)
      .listen(`.${event}`, callback)
      .error(error => console.log('echo:error', error))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
