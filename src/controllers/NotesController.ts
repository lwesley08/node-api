import IControllerBase from '../interfaces/IControllerBase';
import { ObjectID, MongoClient, FilterQuery, MongoError, UpdateWriteOpResult, InsertOneWriteOpResult } from 'mongodb';
import { Request, Response } from 'express';
import { Router } from 'express';
import { getDb } from '../mongo';
import { Note } from '../models/Note';

export default class NotesController implements IControllerBase {
    public path: string = '/notes';
    public router: Router = Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.post('', (req: Request, res: Response): void => {
            // Create note here
            const note: Note = { text: req.body.body, title: req.body.title };
            getDb().db().collection('notes').insertOne(note, (err: MongoError, result: InsertOneWriteOpResult<any>): void => {
                if (err) {
                    res.send( { 'error': 'An error has occured'});
                } else {
                    res.send(result.ops[0]);
                }
            });
        });

        this.router.get('/:id', (req: Request, res: Response): void => {
            const id: string = req.params.id;
            const details: FilterQuery<Note> = {'_id': new ObjectID(id) };
            getDb().db().collection('notes').findOne(details, (err: MongoError, item: UpdateWriteOpResult): void => {
                if (err) {
                    res.send( { 'error': 'An error has occured'});
                } else {
                    res.send(item);
                }
            })
        });

        this.router.delete('/:id', (req: Request, res: Response): void => {
            const id: string = req.params.id;
            const details: FilterQuery<Note> = {'_id': new ObjectID(id) };
            getDb().db().collection('notes').deleteOne(details, (err: MongoError, item: UpdateWriteOpResult): void => {
                if (err) {
                    res.send( { 'error': 'An error has occured'});
                } else {
                    res.send('Note ' + id + ' deleted');
                }
            })
        });

        this.router.put('/:id', (req: Request, res: Response): void => {
            const id: string = req.params.id;
            const details: FilterQuery<Note>  = {'_id': new ObjectID(id) };
            const note: Note = { text: req.body.body, title: req.body.title };
            getDb().db().collection('notes').updateOne(details, note, (err: MongoError, item: UpdateWriteOpResult): void => {
                if (err) {
                    res.send( { 'error': 'An error has occured'});
                } else {
                    res.send(item);
                }
            })
        });
    }

}