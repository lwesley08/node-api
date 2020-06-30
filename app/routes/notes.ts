import * as express from 'express';
import { ObjectID, MongoClient } from 'mongodb';

const router = express.Router();

export const notesRoutes = (getDb: () => MongoClient) => {
    router.post('', (req, res) => {
        // Create note here
        const note = { text: req.body.body, title: req.body.title };
        getDb().db().collection('notes').insertOne(note, (err, result) => {
            if (err) {
                res.send( { 'error': 'An error has occured'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    router.get('/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };
        getDb().db().collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send( { 'error': 'An error has occured'});
            } else {
                res.send(item);
            }
        })
    });

    router.delete('/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };
        getDb().db().collection('notes').deleteOne(details, (err, item) => {
            if (err) {
                res.send( { 'error': 'An error has occured'});
            } else {
                res.send('Note ' + id + ' deleted');
            }
        })
    });

    router.put('/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        getDb().db().collection('notes').updateOne(details, note, (err, item) => {
            if (err) {
                res.send( { 'error': 'An error has occured'});
            } else {
                res.send(item);
            }
        })
    });
    return router;
}

