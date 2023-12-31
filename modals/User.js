import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    requred: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: "",
  },
  displayName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    trim: true,
    required: true,
    lowerCase: true,
  },
  image: {
    type: String,
    default: "",
  },
  createAt: {
    type: Number,
    default: Date.now(),
  },
});

const User = mongoose.model('user', userSchema);
export default User;
