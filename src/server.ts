import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'

import UsersController from './controllers/UsersController'
import NotesController from './controllers/NotesController'

const app: App = new App({
    port: 5000,
    controllers: [
        new UsersController(),
        new NotesController()
    ],
    middleware: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
});

app.listen();
