import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import validator from 'validator';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
}

const userSchema: any = new mongoose.Schema({
    firstName: String,
    lastName: String,
});

export default mongoose.model<IUser>('User', userSchema);