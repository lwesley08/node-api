import { secret } from './jwtConfig';
import * as bcrypt from 'bcrypt';
import * as passport from 'passport';
import { Strategy as localStrategy, IVerifyOptions } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import PassportUser, { IPassportUser } from '../models/PassportUser';
import UserInfo from '../services/userInfo';

const BCRYPT_SALT_ROUNDS: number = 12;

let userContext: UserInfo = null;

export function passportSetup({ userInfo }: {userInfo: UserInfo}): void {

    console.log('here');

userContext = userInfo;

passport.use(
    'register',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false,
        },
        (username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void): void => {
            try {
                PassportUser.findOne({
                    username,
                }).then ((user: IPassportUser): void => {
                    if(user !== null) {
                        console.debug('username already taken');
                        return done(null, false, { message: 'username already taken'});
                    } else {
                        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword: string): void => {
                            PassportUser.create({ username, password: hashedPassword }).then((createdUser: IPassportUser): void => {
                                console.debug('user created');
                                return done(null, createdUser);
                            });
                        });
                    }
                });
            } catch(err) {
                done(err);
            }
        },
    ),
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false,
        },
        (username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void): void => {
            try {
                PassportUser.findOne({
                    username,
                }).then((user: IPassportUser): void => {
                    if(user === null) {
                        return done(null, false, { message: 'bad username' });
                    } else {
                        bcrypt.compare(password, user.password).then((response: boolean): void => {
                            if (response !== true) {
                                console.debug('passwords do not match');
                                return done(null, false, { message: 'passwords do not match' });
                            }
                            console.debug('user found & authenticated');
                            return done(null, user);
                        });
                    }
                });
            } catch (err) {
                done(err)
            }
        },
    ),
);

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: secret,
};

passport.use(
    'jwt',
    new JWTstrategy(opts, (jwt_payload: any, done: VerifiedCallback): void => {
        try {
            PassportUser.findOne({
                username: jwt_payload.id,
            }).then((user: IPassportUser): void => {
                if (user) {
                    console.debug('user found in db in passport');
                    userContext.username = user.username;
                    done(null, user);
                } else {
                    console.debug('user not found in db');
                    done(null, false);
                }
            });
        } catch(err) {
            done(err);
        }
    }),
);
}
