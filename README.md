# React On Maxs

## Features

1. Modern javascript (ES6+)
1. Styles: CSS Modules, Scss, [emotion](https://github.com/emotion-js/emotion)
1. Best code practices enforced by Eslint
1. Code formatting by Prettier
1. Types checking with Flow
1. Webpack configured by [webpack-features](https://github.com/Noviel/webpack-features)
1. Slick development flow with hot reloading

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
