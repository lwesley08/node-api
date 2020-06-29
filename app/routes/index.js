var express = require('express');
var router = express.Router();
const noteRoutes = require('./note_routes');

const routes = (test) => {
    console.log(test)
    router.use('/notes', noteRoutes(test));
    return router;
}

module.exports = routes;