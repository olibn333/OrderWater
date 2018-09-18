# OrderWater
React Ordering and Order-Taking Platform

3 Pieces:

1. Client - Consumer that Orders
2. Client2 - Business that receives Orders
3. Server - API that calls to sqlite server

Usage:
- clone this repo
 <br /> <br />
Install npm packages for client, client2 and root folders:
- 'npm install'
- 'cd client2', 'npm install'
- 'cd client', 'npm install'
 <br /> <br />
Run!
- 'npm start' on top level to start all Pieces. You should get 2 open browser pages pointing at localhost, both talking to the server.

Todo:
- merge clients 1&2 into 1 app
- user management, points usage, rewards
- santitise sql
- server sent events for auto update
- make the cat wink
- o so much more



Clients were bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

