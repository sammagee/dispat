# Dispat

This repository holds the code for the frontend of the application. For information about the backend, go to [github.com/sammagee/api.dispat](https://github.com/sammagee/api.dispat).

## Setup

Please ensure you have [NodeJS](https://nodejs.org/en/) installed. This command will install all dependencies for the frontend project.

```sh
npm install
```

Next, copy the environment file example:

```sh
cp .env.example .env
```

## Usage

### Run

This command will run the development server.

```sh
npm run dev
```

The application should now be running at [localhost:3000](http://localhost:3000).

## Files

These are some important files within the backend that make things work:

- [`/src/lib/echo.js`](./src/lib/echo.js) This file creates the client that communicates with the backend server. It also denotes the API endpoint that is used for authenticating WebSocket requests.
- [`/src/hooks/events.js`](./src/hooks/events.js`) This file uses the client to connect to the WebSocket server and join the channel(s). It then sets up listeners for each of the servers and sets up the user logic for the presence channels.
- [`/src/pages/**](./src/pages) The files in this folder creates each of the routes and pages used in the frontend application. The file names map to the routes in the URL.

## Links

This project is made possible by the following:

- NextJS - [nextjs.org](https://nextjs.org)
- Laravel Echo - [laravel.com/docs](https://laravel.com/docs/9.x/broadcasting#client-side-installation)
