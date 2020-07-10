import IControllerBase from '../interfaces/IControllerBase';
import { ObjectID, MongoClient, FilterQuery, MongoError, UpdateWriteOpResult, InsertOneWriteOpResult } from 'mongodb';
import { Request, Response } from 'express';
import { Router } from 'express';
import Note, { INote } from '../models/Note';
import passport = require('passport');

export default class NotesController implements IControllerBase {
    public path: string = '/notes';
    public router: Router = Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.post('', passport.authenticate('jwt', { session: false }), this.postNote);

        this.router.get('/:id', (req: Request, res: Response): void => {
            const id: string = req.params.id;
            Note.findById(id)
            .then((doc: INote): void => {
                res.send(doc);
            })
            .catch((err: any): void => {
                res.send( { 'error': 'An error has occured'});
            })
        });

        this.router.delete('/:id', (req: Request, res: Response): void => {
            const id: string = req.params.id;
            Note.findByIdAndDelete(id)
            .then((doc: INote): void => {
                res.send('Note ' + id + ' deleted');
            })
            .catch((err: any): void => {
                res.send( { 'error': 'An error has occured'});
            })
        });

        this.router.put('/:id', (req: Request, res: Response): void => {
            const id: string = req.params.id;
            const note: INote = new Note({ text: req.body.body, title: req.body.title});
            Note.findByIdAndUpdate(id, note,
                {
                    new: true,                       // return updated doc
                    runValidators: true              // validate before update
                })
            .then((doc: INote): void => {
                res.send(doc);
            })
            .catch((err: any): void => {
                res.send( { 'error': 'An error has occured'});
            })
        });
    }

    private postNote(req: Request, res: Response): void {
        // Create note here
        const note: INote = new Note({ text: req.body.body, title: req.body.title });
        note.save().then((doc: INote): void => {
            res.send(doc);
        })
        .catch((err: any): void => {
            res.send( { 'error': 'An error has occured'});
        })
    }

}