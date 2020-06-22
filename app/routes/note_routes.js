const { ObjectID } = require("mongodb");

module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
        // Create note here
        const note = { text: req.body.body, title: req.body.title };
        db.db().collection('notes').insertOne(note, (err, result) => {
            if (err) {
                res.send( { 'error': 'An error has occured'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };
        db.db().collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send( { 'error': 'An error has occured'});
            } else {
                res.send(item);
            }
        })
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };
        db.db().collection('notes').deleteOne(details, (err, item) => {
            if (err) {
                res.send( { 'error': 'An error has occured'});
            } else {
                res.send('Note ' + id + ' deleted');
            }
        })
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.db().collection('notes').updateOne(details, note, (err, item) => {
            if (err) {
                res.send( { 'error': 'An error has occured'});
            } else {
                res.send(item);
            }
        })
    });
}