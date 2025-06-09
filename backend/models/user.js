import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

const User = mongoose.model('User', userSchema);
export default User;
