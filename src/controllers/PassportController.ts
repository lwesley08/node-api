import IControllerBase from '../interfaces/IControllerBase';
import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import UtilService from '../services/utility';
import passport = require('passport');
import PassportUser, { IPassportUser } from '../models/PassportUser';
import { secret } from '../config/jwtConfig';
import jwt = require('jsonwebtoken');

export default class PassportController implements IControllerBase {
    public path: string = '/passport';
    public router: Router = Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes(): void {

        this.router.post('/registerUser', (req: Request, res: Response, next: NextFunction): void => {
            passport.authenticate('register', (err: any, user: any, info: any): void => {
                if (err) {
                    console.debug(err);
                }
                if (info !== undefined) {
                    console.debug(info.message);
                    res.send(info.message);
                } else {
                    req.logIn(user, (logInError: any): void => {
                        const data: any = {
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            username: user.username,
                        }
                        PassportUser.findOne({
                            username: data.username,
                        }).then((createdUser: IPassportUser): void => {
                            createdUser.update({
                                first_name: data.first_name,
                                last_name: data.last_name,
                                email: data.email,
                            })
                            .then((): void => {
                                console.debug('user created in db');
                                res.status(200).send({ message: 'user created' });
                            });
                        });
                    });
                }
            })(req, res, next);
        });

        this.router.get('/loginUser',  (req: Request, res: Response, next: NextFunction): void => {
            passport.authenticate('login', (err: any, user: any, info: any): void => {
                if (err) {
                    console.debug(err);
                }
                if (info !== undefined) {
                    console.debug(info.message)
                    res.send(info.message);
                } else {
                    req.login(user, (logInError: any): void => {
                        PassportUser.findOne({
                            username: user.username,
                        }).then((foundUser: IPassportUser): void => {
                            const token: string = jwt.sign({ id: foundUser.username }, secret);
                            res.status(200).send({
                                auth: true,
                                token,
                                message: 'user found & logged in',
                            });
                        });
                    });
                }
            })(req, res, next);
        });

        this.router.get('/findUser', (req: Request, res: Response, next: NextFunction): void => {
            passport.authenticate('jwt', { session: false }, (err: any, user: any, info: any): void => {
                if (err) {
                    console.debug(err);
                }
                if (info !== undefined) {
                    console.debug(info.message)
                } else {
                    console.debug('user found in db from route');
                    res.status(200).send({
                        auth: true,
                        firstname: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        username: user.username,
                        password: user.password,
                        message: 'user found in db',
                    });
                }
            })(req, res, next);
        });
    }
}