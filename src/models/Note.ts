import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import validator from 'validator';
// let timestampPlugin = require('./plugins/timestamp')

export interface INote extends Document {
    text: string;
    title: string;
}

const noteSchema: any = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        validate: (value: string): boolean => {
            return validator.isLength(value, { min: 3, max: 20 });
        }
    },
    title: String,
})

// can also have virtual properties, methods, and statics
// also middleware to set updated props every save
// noteSchema.pre('save', function (next) {
//   let now = Date.now()
//   this.updatedAt = now
//   // Set a value for createdAt only if it is null
//   if (!this.createdAt) {
//     this.createdAt = now
//   }
//   // Call the next function in the pre-save chain
//   next();
// })

// or plugins
// noteSchema.plugin(timestampPlugin)

// export class Note {
//     // public _id: string;
//     public text: string;
//     public title: string;
// }

export default mongoose.model<INote>('Note', noteSchema);