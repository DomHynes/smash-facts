import mongoose from 'mongoose';

export default callback => {
  mongoose.Promise = Promise;

  mongoose.connect(process.env.MONGO_URL, { useMongoClient: true })
    .then( callback )
    .catch( e => {
      console.log(`unable to connect to database, error: ${e}`);
      throw e;
    });
}
