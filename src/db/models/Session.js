import { Schema, model } from 'mongoose';

const sessionSchema = new Schema({}, { versionKey: false, timestamps: true });

const SessionCollection = model('session', sessionSchema);

export default SessionCollection;
