import mongoose from 'mongoose';
import dbConfig from './config/db';

export class Database {
    constructor() {
        this.connect();
        // mongoose.connection.on('disconnected', this.connect);
    }

    public connect(): void {
        mongoose.connect(dbConfig.url)
       .then((): void => {
         console.debug('Database connection successful')
       })
       .catch((err: any): void => {
         console.error('Database connection error')
       })
    }
}

// export const db: Database = new Database();