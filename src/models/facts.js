import mongoose from 'mongoose';

const facts = new mongoose.Schema({
  fact: { type: String, required: true },
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true}],
  submitted_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, { timestamps: true });

facts.index({'games.id': 1});

export default mongoose.model('Fact', facts);
