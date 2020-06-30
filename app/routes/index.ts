import * as express from 'express';
import User from './users';

class Routes {
    public router = express.Router();

    constructor() {
        // this.router.use('/notes', noteRoutes(test));
        this.router.use('/user', User)
    }
}

export default new Routes().router;