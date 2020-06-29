const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('../../config/db');

let _db;

const connecctionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

function initDb(callback) {
    if (_db) {
        console.log('db already init');
        return(callback, _db);
    }
    MongoClient.connect(dbConfig.url,  connecctionOptions,
        (err, db) => {
            if (err) {
                return callback(err);
            }
            console.log("DB initialized - connected to: ");
            _db = db;
            return callback(null, _db);
        }
    )

}

function getDb() {
    // assert.ok(_db, "Db has not been initialized. Please called init first.");
    if (!_db) {
        initDb();
    }
    return _db;
}

module.exports = {
    getDb,
    initDb
};