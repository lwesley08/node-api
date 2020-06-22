const noteRoutes = require('./note_routes');

module.exports = function(app, db) {
    noteRoutes(app, db);
    
    app.get("*", function(req, res) {
        res.send("App works!!!!!");
    })
}