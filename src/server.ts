import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'

import UsersController from './controllers/UsersController'
import NotesController from './controllers/NotesController'
import SocialController from './controllers/SocialController'

const app: App = new App({
    port: 5000,
    controllers: [
        new UsersController(),
        new NotesController(),
        new SocialController ()
    ],
    middleware: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
});

app.listen();
