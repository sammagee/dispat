import { useEffect, useState } from 'react'

export default function useEcho({ channel, events, callback }) {
  const [viewingUsers, setViewingUsers] = useState([])

  useEffect(() => {
    const EchoChannel = Echo.channel(channel).error(error =>
      console.log('echo:error', error),
    )

    events?.forEach(event => EchoChannel.listen(`.${event}`, callback))
  }, [callback, channel, events])

  return { viewingUsers }
}
