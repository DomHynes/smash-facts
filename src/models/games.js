import mongoose from 'mongoose';

const games = new mongoose.Schema({
  name: String,
  longName: String
});
export default mongoose.model('Games', games);
