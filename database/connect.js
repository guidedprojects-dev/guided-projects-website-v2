import { MongoClient } from "mongodb";
import { PrismaClient } from "@prisma/client";

global.mongo = global.mongo || {};
global.prisma = global.prisma || {};

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

  const db = global.mongo.client.db("guided-projects");

  return { db, dbClient: global.mongo.client };
};

export const connectToPrisma = async () => {
  if (!global.prisma.client) {
    const client = new PrismaClient();
    global.prisma.client = client;
  }

  return { dbClient: global.prisma.client };
};
