import mongoose from 'mongoose';

let connected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('[db] MONGODB_URI not set — running with in-memory fallback storage.');
    return false;
  }
  try {
    await mongoose.connect(uri);
    connected = true;
    console.log('[db] Connected to MongoDB');
    return true;
  } catch (err) {
    console.warn('[db] Could not connect to MongoDB, using in-memory fallback storage:', err.message);
    return false;
  }
}

export function isDbConnected() {
  return connected;
}
