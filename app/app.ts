import * as express from 'express';
import * as bodyParser from 'body-parser';
import Routes from './routes';
import { Request, Response } from 'express'

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.use('/api', Routes);
        // handle undefined routes
        this.express.use('*', (req: Request, res: Response): void => {
            res.send('Make sure url is correct!!!');
        });

    }
}

export default new App().express;