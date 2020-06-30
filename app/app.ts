import * as express from 'express';
import * as bodyParser from 'body-parser';

class App {
    public express: express.Application;

    // array to hold users
    users: any[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.users = [{firstName:"fnam1",lastName:"lnam1",userName:"username1"}];
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        
        this.express.use('/', (req,res,next) => {
            res.send("Typescript App works with nodemon!!!");
        });

        // request to get all the users
        this.express.get("/users", (req,res,next) => {
            console.log("url:::::::"+req.url)
            res.json(this.users);
        })

        // request to get all the users by userName
        this.express.get("/users/:userName", (req,res,next) => {
            console.log("url:::::::"+req.url)
            let user = this.users.filter(function(user){
                if(req.params.userName === user.userName){
                    return user;
                }
            })
            res.json(user);
        })

        // request to post the user
        // req.body has object of type {firstName:"fnam1",lastName:"lnam1",userName:"username1"}
        this.express.post("/user", (req,res,next) => {
            console.log("url:::::::"+req.url)
            this.users.push(req.body);
            res.json(this.users);
        })
    }
}

export default new App().express;