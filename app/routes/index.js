var express = require('express');
var router = express.Router();
const noteRoutes = require('./note_routes');

router.use('/notes', noteRoutes)

module.exports = router;