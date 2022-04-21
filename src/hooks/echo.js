import { useEffect, useState } from 'react'

export default function useEcho({ channel, event, callback }) {
  const [viewingUsers, setViewingUsers] = useState([])

  useEffect(() => {
    Echo.channel(channel)
      .listen(`.${event}`, callback)
      .error(error => console.log('echo:error', error))
  }, [])

  return { viewingUsers }
}
