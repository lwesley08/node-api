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

to look into because tutorial is out of date
(node:16316) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to
the MongoClient constructor.
We are live on 8005
(node:16316) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
(node:16316) DeprecationWarning: collection.insert is deprecated. Use insertOne, insertMany or bulkWrite instead.
(node:16316) DeprecationWarning: collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead.