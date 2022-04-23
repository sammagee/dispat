import LaravelEcho from 'laravel-echo'
import axios from './axios'

if (typeof window !== 'undefined') {
  window.Pusher = require('pusher-js')
  window.Echo = new LaravelEcho({
    broadcaster: 'pusher',
    key: '12345',
    wsHost: window.location.hostname,
    wsPort: 6001,
    enabledTransports: ['ws', 'wss'],
    forceTLS: false,
    authorizer: (channel, options) => {
      return {
        authorize: (socketId, callback) => {
          axios
            .post('/broadcasting/auth', {
              socket_id: socketId,
              channel_name: channel.name,
            })
            .then(response => {
              callback(false, response.data)
            })
            .catch(error => {
              callback(true, error)
            })
        },
      }
    },
  })
}
