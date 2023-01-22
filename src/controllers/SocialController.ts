import IControllerBase from '../interfaces/IControllerBase';
import { ObjectID, MongoClient, FilterQuery, MongoError, UpdateWriteOpResult, InsertOneWriteOpResult } from 'mongodb';
import { Request, Response } from 'express';
import { Router } from 'express';
import User, { IUser } from '../models/User';
import Chat, { IChat } from '../models/Chat';

export default class SocialController implements IControllerBase {
    public path: string = '/social';
    public router: Router = Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.post('/user', (req: Request, res: Response): void => {
            // Create note here
            const note: IUser = new User({ firstName: req.body.firstName, lastName: req.body.lastName });
            note.save().then((doc: IUser): void => {
                res.send(doc);
            })
            .catch((err: any): void => {
                res.send( { 'error': 'An error has occured'});
            })
        });

        this.router.post('/message', (req: Request, res: Response): void => {
            // Create note here
            const chat: IChat = new Chat({ message: req.body.message, user_id: req.body.user_id });
            chat.save().then((doc: IChat): void => {
                res.send(doc);
            })
            .catch((err: any): void => {
                res.send( { 'error': 'An error has occured'});
            })
        });

        this.router.get('/user/:id', (req: Request, res: Response): void => {
            const id: string = req.params.id;
            console.log(id);
            User.findById(id)
            .then((doc: IUser): void => {
                res.send(doc);
            })
            .catch((err: any): void => {
                res.send( { 'error': 'An error has occured'});
            })
        });

        this.router.get('/message/:id', (req: Request, res: Response): void => {
            const id: string = req.params.id;
            Chat.findById(id).populate('user_id')
            .then((doc: IChat): void => {
                res.send(doc);
            })
            .catch((err: any): void => {
                res.send( { 'error': 'An error has occured'});
            })
        });

    }
}