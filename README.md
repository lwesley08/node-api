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
$ curl -d "title=MacTest&body=CoolNote" http://localhost:5000/api/notes
{"text":"CoolNote","title":"MacTest","_id":"5ef13ec78c254367b588375c"}

$ curl http://localhost:8005/api/notes/5ef13ec78c254367b588375c
{"_id":"5ef13ec78c254367b588375c","text":"CoolNote","title":"MacTest"}

Splitting Mongo into shared file: https://itnext.io/how-to-share-a-single-database-connection-in-a-node-js-express-js-app-fcad4cbcb1e


## Typescript
### https://medium.com/bb-tutorials-and-thoughts/how-to-write-production-ready-node-js-rest-api-typescript-version-94e993b368c0
```
npm install @types/express
```

package.json without nodemon
```
"start": "tsc index.ts && node index.js",
```
https://medium.com/create-a-server-with-nodemon-express-typescript/create-a-server-with-nodemon-express-typescript-f7c88fb5ee71
https://medium.com/bb-tutorials-and-thoughts/how-to-write-production-ready-node-js-rest-api-typescript-version-94e993b368c0

brought me to 
```
    "start": "node --inspect=3070 -r ts-node/register ./index.ts",
    "start:dev": "nodemon",
```
just this did not work
```
    "start": "ts-node index.ts",
    "start:dev": "./node_modules/nodemon/bin/nodemon.js",
```

## Mongoose Refs
### https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/#:~:text=Mongoose%20is%20an%20Object%20Data,of%20those%20objects%20in%20MongoDB.
### https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
### https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1


```
$ curl -d "firstName=Bob&lastName=Jones" http://localhost:5000/social/user
{"_id":"5f077c1eff74e247d46be4e0","firstName":"Bob","lastName":"Jones","__v":0}

$ curl -d "message=Hello&user_id=5f077c1eff74e247d46be4e0" http://localhost:5000/social/message
{"_id":"5f077cfaff74e247d46be4e1","message":"Hello","user_id":"5f077c1eff74e247d46be4e0","__v":0}

curl http://localhost:5000/social/user/5f077c1eff74e247d46be4e0
curl http://localhost:5000/social/message/5f077cfaff74e247d46be4e1


```

### Mongoose Populate => https://mongoosejs.com/docs/populate.html

It would be more correct for chat to have a user prop instead of user_id but i didn't do that
then chat.user._id would work either way
and could be checked for chat.populated('user')
can also do populate('user', 'firstName') or query more specifically

can also have a populated interface vs not and export the model differently if necessary
https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1

### Passport
https://itnext.io/implementing-json-web-tokens-passport-js-in-a-javascript-application-with-react-b86b1f313436

$ curl -d "first_name=John&last_name=Smith&email=fakeemail&username=jsmith99&password=mybirthday" http://localhost:5000/passport/registerUser
$ curl -d "username=jsmith99&password=mybirthday" http://localhost:5000/passport/registerUser