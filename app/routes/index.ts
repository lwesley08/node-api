import * as express from 'express';
import User from './users';
import { notesRoutes } from './notes';
import { MongoClient } from 'mongodb';
import { getDb } from '../db';

class Routes {
    public router = express.Router();

    constructor(getDb: () => MongoClient) {
        // this.router.use('/notes', noteRoutes(test));
        this.router.use('/user', User)
        this.router.use('/notes', notesRoutes(getDb))
    }
}

export default new Routes(getDb).router;