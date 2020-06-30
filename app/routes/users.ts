import * as express from 'express';

var router = express.Router();

const users = [{ firstName: 'fnam1', lastName: 'lnam1', userName: 'username1' }];

// request to get all the users
router.get("/users", (req,res,next) => {
    console.log("url:::::::"+req.url)
    res.json(users);
})

// request to get all the users by userName
router.get("/users/:userName", (req,res,next) => {
    console.log("url:::::::"+req.url)
    let user = users.filter(function(user){
        if(req.params.userName === user.userName){
            return user;
        }
    })
    res.json(user);
})

// request to post the user
// req.body has object of type {firstName:"fnam1",lastName:"lnam1",userName:"username1"}
router.post("/user", (req,res,next) => {
    console.log("url:::::::"+req.url)
    users.push(req.body);
    res.json(users);
})

export default router;