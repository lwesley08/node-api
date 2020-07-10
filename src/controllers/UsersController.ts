import IControllerBase from '../interfaces/IControllerBase';
import { Request, Response } from 'express';
import { Router } from 'express';
import UtilService from '../services/utility';

export default class UsersController implements IControllerBase {
    public path: string = '/';
    public router: Router = Router();
    private users: any[] = [{ firstName: 'fnam1', lastName: 'lnam1', userName: 'username1' }];
    private util: UtilService;

    constructor({ utilService }: { utilService: UtilService}) {
        this.util = utilService;
        this.initRoutes();
    }

    public initRoutes(): void {
        // request to get all the users
        this.router.get('/users', (req: Request, res: Response): void => {
            this.util.testMethod();
            res.json(this.users);
        });

        // request to get all the users by userName
        this.router.get('/users/:userName', (req: Request, res: Response): void => {
            const user: any = this.users.filter((u: any): any => {
                if(req.params.userName === u.userName){
                    return u;
                }
            })
            res.json(user);
        });

        // request to post the user
        // req.body has object of type {firstName:'fnam1',lastName:'lnam1',userName:'username1'}
        this.router.post('/user', (req: Request, res: Response): void  => {
            this.users.push(req.body);
            res.json(this.users);
        });

        // could return the router
        // and then in the app.ts file foreach loop to assign initRoutes to the controller.path
    }
}