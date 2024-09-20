import { Schema, model } from 'mongoose';
import { emailRegexp } from '../../constants/users.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      requred: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const UserCollection = model('user', userSchema);

export default UserCollection;
