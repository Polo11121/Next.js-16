import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!MONGODB_CONNECTION_STRING) {
      throw new Error(
        "Please define the MONGODB_CONNECTION_STRING environment variable inside .env.local"
      );
    }
    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_CONNECTION_STRING!, options)
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

export default connectDB;
