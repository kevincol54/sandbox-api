#sandbox-api

This is a simple express server with two routes:

`localhost:3000/callNicksContainer`

`localhost:3000/callsamsContainer`

#To Use

- make sure you have couchdb installed on your machine and and DB named `samandnickdb` created
- clone all 3 repos (sandbox-api, sams-container, nicks-container)
- `npm install` on all 3 repos (this mean 3 terminal windows open)
- `npm start` on all 3
- call either route using postman, curl, etc
- watch logs for terminal for stdout logs
- should see 4 new logs in couchdb (2 req logs and 2 res logs)
