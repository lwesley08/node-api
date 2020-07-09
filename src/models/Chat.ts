import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';
import validator from 'validator';
import { IUser } from './User';

export interface IChat extends Document {
    message: string;
    user_id: IUser['_id'];
}

const userSchema: any = new mongoose.Schema({
    message: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true },
});

export default mongoose.model<IChat>('Chat', userSchema);