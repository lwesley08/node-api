import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import validator from 'validator';

export interface IPassportUser extends Document {
    username: string;
    password: string;
    first_name?: string;
    last_name?: string;
    email?: string;
}

const passportUserSchema: any = new mongoose.Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    email: String,
});

export default mongoose.model<IPassportUser>('PassportUser', passportUserSchema);