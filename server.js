
var express = require('express');
const bodyParser = require('body-parser');
const mongoUtil = require('./app/db');
const app = express();
var router = express.Router();

const port = 8005;
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./app/routes');
const getDb = require("./app/db").getDb;
app.use('/api', routes(getDb));
app.use("*", function(req, res) {
    res.send("App works!!!!!");
});

mongoUtil.initDb(function(err) {
    app.listen(port, () => {
        console.log("We are live on " + port);
    });
})

