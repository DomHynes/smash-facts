import mongoose from 'mongoose';

const games = new mongoose.Schema({
  name: String,
  longName: String,
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character'}]
});
export default mongoose.model('Game', games);
