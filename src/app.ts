import express from 'express';
import { Application } from 'express';
import { Request, Response } from 'express';
import IControllerBase from './interfaces/IControllerBase';
// import { initDb } from './mongo';
import { Database } from './database'
import * as swaggerUI from 'swagger-ui-express';
// const swaggerUI = require('swagger-ui-express');
import { swaggerDocument } from '../swagger';
import swaggerJSDoc from 'swagger-jsdoc';

class App {
    public app: Application;
    public port: number;
    public db: Database;

    constructor (appInit: { port: number; middleware: any; controllers: any; }) {
        this.app = express();
        this.port = appInit.port;
        this.db = new Database();
        this.middleware(appInit.middleware);
        this.swagger();
        this.routes(appInit.controllers);
        // this.assets();
        // this.template();
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

    private swagger(): void {
        const options: any = {
            swaggerDocument,
            apis: ['./controllers/*.ts']
        };
        const swaggerSpec: any = swaggerJSDoc(options);
        this.app.get('./swagger.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
        })
        console.log(swaggerSpec);
        this.app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
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