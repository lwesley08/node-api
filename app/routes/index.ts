import { Router } from 'express';
import User from './users';
import { notesRoutes } from './notes';
import { MongoClient } from 'mongodb';
import { getDb as _getDb } from '../db';

class Routes {
    public router: Router = Router();

    constructor(getDb: () => MongoClient) {
        // this.router.use('/notes', noteRoutes(test));
        this.router.use('/user', User)
        this.router.use('/notes', notesRoutes(getDb))
    }
}

export default new Routes(_getDb).router;