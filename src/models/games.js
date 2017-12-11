import mongoose from 'mongoose';

const games = new mongoose.Schema({
  name: String
});
export default mongoose.model('Games', games);
