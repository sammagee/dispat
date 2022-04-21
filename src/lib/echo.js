import LaravelEcho from 'laravel-echo'

if (typeof window !== 'undefined') {
  window.Pusher = require('pusher-js')
  window.Echo = new LaravelEcho({
    broadcaster: 'pusher',
    key: '12345',
    wsHost: window.location.hostname,
    wsPort: 6001,
    enabledTransports: ['ws', 'wss'],
    forceTLS: false,
  })
}
