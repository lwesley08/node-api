import { Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

const users = [{ firstName: 'fnam1', lastName: 'lnam1', userName: 'username1' }];

// request to get all the users
router.get('/users', (req: Request, res: Response): void => {
    res.json(users);
})

// request to get all the users by userName
router.get('/users/:userName', (req: Request, res: Response): void => {
    const user = users.filter((u) => {
        if(req.params.userName === u.userName){
            return u;
        }
    })
    res.json(user);
})

// request to post the user
// req.body has object of type {firstName:'fnam1',lastName:'lnam1',userName:'username1'}
router.post('/user', (req: Request, res: Response): void  => {
    users.push(req.body);
    res.json(users);
})

export default router;