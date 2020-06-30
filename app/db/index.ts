import * as Mongo from 'mongodb';
import dbConfig from '../../config/db';

let _db: Mongo.MongoClient;

const connecctionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

export const initDb = (callback?: any) => {
    if (_db) {
        return callback(null, _db);
    }
    Mongo.connect(dbConfig.url,  connecctionOptions,
        (err, db) => {
            if (err) {
                return callback(err);
            }
            _db = db;
            return callback(null, _db);
        }
    )
}

export const getDb = () => {
    if (!_db) {
        initDb();
    }
    return _db;
}
