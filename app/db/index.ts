import * as Mongo from 'mongodb';
import dbConfig from '../../config/db';

let _db: Mongo.MongoClient;

const connectionOptions: any = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};
// TODO types
export const initDb: (cb?: any) => any = (callback?: any): any => {
    if (_db) {
        return callback(null, _db);
    }
    Mongo.connect(dbConfig.url,  connectionOptions,
        (err: Mongo.MongoError, db: Mongo.MongoClient): any => {
            if (err) {
                return callback(err);
            }
            _db = db;
            return callback(null, _db);
        }
    )
}

export const getDb: () => Mongo.MongoClient = (): Mongo.MongoClient => {
    if (!_db) {
        initDb();
    }
    return _db;
}
