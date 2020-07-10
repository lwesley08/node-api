import App from './app';
import { createContainer, asClass, ContainerOptions, InjectionMode, AwilixContainer } from 'awilix';

import * as bodyParser from 'body-parser';
import loggerMiddleware from './middleware/logger';

import UsersController from './controllers/UsersController';
import NotesController from './controllers/NotesController';
import SocialController from './controllers/SocialController';

const container: AwilixContainer = createContainer({
    injectionMode: InjectionMode.PROXY
});

container.register({
    socialController: asClass(SocialController),
    userController: asClass(UsersController),
    notesController: asClass(NotesController)
});

const app: App = new App({
    port: 5000,
    controllers: [
        container.resolve('userController'),
        container.resolve('notesController'),
        container.resolve('socialController')
    ],
    middleware: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
});

app.listen();
