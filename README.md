# React On Maxs

## Features

1. Support for modern code syntax via Babel
1. Great developer expirience with Webpack and Hot Reloading
1. Best code practices by Eslint
1. Less bugs with Flow types check

## Scripts

### dev

Command for realtime development of a client. It launches a server with hot reloading for the client side code. A server itself will not be recompiled and restarted on changes, because otherwise it will break the hot reloading magic. If you are working on the server and need it to be auto rebuilt and restarted use `start:dev` + `watch`.

Note: server side rendering is **disabled** in this mode.

### start:dev

Command for server-side development. It builds the code and launches a server in development mode, which means you will be able to test server side features and see errors and warnings from the libraries.  It can be used along side with `watch` launched in parallel for an automatically server restarting on the code updates.

Note: you should manually reload browser's page after update of the client bundle while using `watch`.

### watch:server

Rebuilds server in development mode on the code updates.

### watch:client

Rebuilds client in development mode on the code updates.

### watch

Launches `watch:server` and `watch:client` in parallel.
