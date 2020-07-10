import App from './app';
import { createContainer, asClass, ContainerOptions, InjectionMode, AwilixContainer } from 'awilix';

import * as bodyParser from 'body-parser';
import loggerMiddleware from './middleware/logger';

import UsersController from './controllers/UsersController';
import NotesController from './controllers/NotesController';
import SocialController from './controllers/SocialController';
import PassportController from './controllers/PassportController';
import UtilService from './services/utility';

const container: AwilixContainer = createContainer({
    injectionMode: InjectionMode.PROXY
});

container.register({
    utilService: asClass(UtilService),
    socialController: asClass(SocialController),
    userController: asClass(UsersController),
    notesController: asClass(NotesController),
    passportController: asClass(PassportController),
});

const app: App = new App({
    port: 5000,
    controllers: [
        container.resolve('userController'),
        container.resolve('notesController'),
        container.resolve('socialController'),
        container.resolve('passportController'),
    ],
    middleware: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
});

app.listen();
