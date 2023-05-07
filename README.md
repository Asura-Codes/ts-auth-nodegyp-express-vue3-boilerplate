**Boilerplate for Node.js for client and server app with low-level access to hardware.**

Originally software written for CM4 (Compute Module 4) for monitoring and controlling device. Allowing access to stored resources in a simple and flexible way with JWT authorization.

## Boilerplate is divided into three parts:

+ Client (Vue3 + Vite + Vuetify): ```/Client```
+ Server (Express + Express-JWT + JsonWebToken): ```/Server```
+ Addon (node-gyp): ```/Server/addon```

## Build and run

+ [```/Client/README.md```](https://github.com/Asura-Codes/ts-auth-nodegyp-express-vue3-boilerplate/Client)
+ [```/Server/README.md```](https://github.com/Asura-Codes/ts-auth-nodegyp-express-vue3-boilerplate/Server)
+ [```/Server/addon/README.md```](https://github.com/Asura-Codes/ts-auth-nodegyp-express-vue3-boilerplate/Server/addon)

### Comments

- Addon after build is not hot-reloaded. Node after launch loads  ```.node``` file. Server after changes in addon needs restart.

### Tech Stack (Server):

+ [node.js](https://nodejs.org/)
+ [express](https://github.com/expressjs/express)
+ [node-gyp](https://github.com/nodejs/node-gyp)
+ [cors](https://github.com/expressjs/cors)
+ [dotenv](https://github.com/motdotla/dotenv)
+ [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
+ [express-jwt](https://github.com/auth0/express-jwt)
+ [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
+ [http-status-codes](https://github.com/prettymuchbryce/http-status-codes)
+ [cookie](https://github.com/jshttp/cookie)
+ [cookie-parser](https://github.com/expressjs/cookie-parser)
+ [nocache](https://github.com/helmetjs/nocache)
+ [winston](https://github.com/winstonjs/winston)
+ [morgan](https://github.com/expressjs/morgan)

### Tech Stack (Client):

+ [Vue](https://github.com/vuejs/core)
+ [Vuetify](https://github.com/vuetifyjs/vuetify)
+ [Axios](https://github.com/axios/axios)
+ [Vue Router](https://github.com/vuejs/router)
+ [Vite](https://vitejs.dev/)
+ [Pinia](https://pinia.vuejs.org/)