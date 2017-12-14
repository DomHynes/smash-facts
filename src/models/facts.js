import mongoose from 'mongoose';

const facts = new mongoose.Schema({
  fact: String,
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game'}],
  submitted_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true });

facts.index({'games.id': 1});

export default mongoose.model('Fact', facts);
