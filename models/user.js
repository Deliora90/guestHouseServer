import pkg from 'mongoose';
const { Schema, model } = pkg;

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  surname: { type: String },
  name: { type: String },
  middleName: { type: String },
  phoneNumber: { type: String },
  homePhoneNumber: { type: String },
  town: { type: String }
});

export default model('User', UserSchema);
