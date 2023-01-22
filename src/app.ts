import * as express from 'express';
import { Application } from 'express';
import { Request, Response } from 'express';
import IControllerBase from './interfaces/IControllerBase';
// import { initDb } from './mongo';
import { Database } from './database'
import * as Cors from 'cors';
import * as passport from 'passport';
import { passportSetup } from './config/passport';
// import { passportSetup } from './config/passport';

class App {
    public app: Application;
    public port: number;
    public db: Database;

    constructor (appInit: { port: number; middleware: any; controllers: any; }) {
        this.app = express();
        this.port = appInit.port;
        this.useCors();
        this.db = new Database(); // mongo
        this.middleware(appInit.middleware);
        this.passport();
        this.routes(appInit.controllers);
        // this.assets();
        // this.template();
    }

    private useCors(): void {
        const corsOptions: any = {
            credentials: true,
            origin: [],
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        };
        this.app.use(Cors(corsOptions));
    }

    private passport(): void {
        this.app.use(passport.initialize())
    }

    private middleware(middleware: any[]): void { // ?
        middleware.forEach((m: any): void => {
            this.app.use(m)
        })
    }

    private routes(controllers: IControllerBase[]): void {
        controllers.forEach((controller: any): void => {
            this.app.use(controller.path, controller.router)
        });

        this.app.use('*', (req: Request, res: Response): void => {
            res.send('Make sure url is correct!!');
        });
    }

    // private assets() {
    //     this.app.use(express.static('public'))
    //     this.app.use(express.static('views'))
    // }

    // private template() {
    //     this.app.set('view engine', 'pug')
    // }

    public listen(): void {
        this.app.listen(this.port, (): void => {
            console.debug(`App listening on the http://localhost:${this.port}`);
        })
    }
}

export default App;