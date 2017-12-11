import mongoose from 'mongoose';

const characters = new mongoose.Schema({
  name: String
}, { timestamps: true });
export default mongoose.model('Character', characters);
