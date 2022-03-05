import * as mongoose from 'mongoose';

export const TestSchema = new mongoose.Schema({
    title: { type: String, index: true },
    description: { type: String, default: null },
    status: { type: String, default: "TEST", index: true },
    timestamp: { type: Number, default: Date.now },
});