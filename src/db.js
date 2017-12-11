import mongoose from 'mongoose';
import blackbird from 'blackbird';

export default callback => {
  mongoose.promise = blackbird;

  mongoose.connect(process.env.MONGO_URL, { useMongoClient: true })
    .then( () => callback(mongoose) )
    .catch( e => {
      console.log(`unable to connect to database, error: ${e}`);
      throw e;
    });
}
