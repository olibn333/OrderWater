# OrderWater
React Ordering and Order-Taking Platform

Demo Here:
https://olibn333.github.io/OrderWater/

<img src="https://github.com/olibn333/OrderWater/blob/master/client/src/icons/logo.svg" width="200"/>

2 Pieces:

1. Client - Consumer that Orders and Business that receives Orders 
2. Server - API that calls to sqlite server

Usage:
- clone this repo ('clone https://github.com/olibn333/OrderWater')
 <br /> <br />
Install npm packages for client and root folders:
- 'npm install'
- 'cd client', 'npm install'
 <br /> <br />
Run!
- 'npm start' on top level to start client and server together. You should get a browser page pointing at localhost:3000 talking to the server.
-'cd client' and 'npm run build' to build client only

Todo:
- ~merge clients 1&2 into 1 app~
- user management, points usage, rewards
- santitise sql
- server sent events for auto update
- ~make the cat blink~
- o so much more



Clients were bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

