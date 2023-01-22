import { Router } from 'express';

export default interface IControllerBase {
    path: string;
    router: Router;
    initRoutes(): any
}