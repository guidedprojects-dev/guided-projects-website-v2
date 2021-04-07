import { MongoClient } from 'mongodb';

global.mongo = global.mongo || {};

export const connectToDB = async () => {
  if (!global.mongo.client) {
    const client = new MongoClient(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000,
    });

    global.mongo.client = client;

    await global.mongo.client.connect();
  }

  const db = global.mongo.client.db('guided-projects');

  return { db, dbClient: global.mongo.client };
};
