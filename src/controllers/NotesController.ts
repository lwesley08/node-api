import IControllerBase from '../interfaces/IControllerBase';
import { ObjectID, MongoClient, FilterQuery, MongoError, UpdateWriteOpResult, InsertOneWriteOpResult } from 'mongodb';
import { Request, Response } from 'express';
import { Router } from 'express';
import Note from '../models/Note';

export default class NotesController implements IControllerBase {
    public path: string = '/notes';
    public router: Router = Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.post('', (req: Request, res: Response): void => {
            // Create note here
            const note: any = new Note({ text: req.body.body, title: req.body.title });
            note.save().then((doc: any): void => {
                res.send(doc);
            })
            .catch((err: any): void => {
                res.send( { 'error': 'An error has occured'});
            })
        });

        this.router.get('/:id', (req: Request, res: Response): void => {
            const id: string = req.params.id;
            Note.findById(id)
            .then((doc: any): void => {
                res.send(doc);
            })
            .catch((err: any): void => {
                res.send( { 'error': 'An error has occured'});
            })
        });

        this.router.delete('/:id', (req: Request, res: Response): void => {
            const id: string = req.params.id;
            Note.findByIdAndDelete(id)
            .then((doc: any): void => {
                res.send('Note ' + id + ' deleted');
            })
            .catch((err: any): void => {
                res.send( { 'error': 'An error has occured'});
            })
        });

        this.router.put('/:id', (req: Request, res: Response): void => {
            const id: string = req.params.id;
            Note.findByIdAndUpdate(id, { text: req.body.body, title: req.body.title},
                {
                    new: true,                       // return updated doc
                    runValidators: true              // validate before update
                })
            .then((doc: any): void => {
                res.send(doc);
            })
            .catch((err: any): void => {
                res.send( { 'error': 'An error has occured'});
            })
        });
    }

}