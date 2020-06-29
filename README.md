# node-api

npm init
npm i express mongodb body-parser
npm i --save-dev nodemon

Using MongoDb:Atlas
### https://docs.atlas.mongodb.com/getting-started/

Create Cluster
Create User
Create database and collection => notable and notes in here
put connection string in db.js
then access db.collection('notes');
### https://cloud.mongodb.com/
Nodemon is for HMR

Curl Tests
$ curl -d "title=MacTest&body=CoolNote" http://localhost:8005/api/notes
{"text":"CoolNote","title":"MacTest","_id":"5ef13ec78c254367b588375c"}

$ curl http://localhost:8005/api/notes/5ef13ec78c254367b588375c
{"_id":"5ef13ec78c254367b588375c","text":"CoolNote","title":"MacTest"}

Splitting Mongo into shared file: https://itnext.io/how-to-share-a-single-database-connection-in-a-node-js-express-js-app-fcad4cbcb1e

