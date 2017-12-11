import mongoose from 'mongoose';

const facts = new mongoose.Schema({
  fact: String,
  characters: [{ type: String }],
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'games'}]
}, { timestamps: true });


export default mongoose.model('Fact', facts);
