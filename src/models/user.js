import mongoose from 'mongoose';


const User = new mongoose.Schema({
  oauthID: String,
  name: String
}, { timestamps: true });

export default User