import { Document } from 'mongoose';

export class Test extends Document {
    readonly title: String;
    readonly description: String;
}