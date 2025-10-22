import 'server-only';
import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV || 'development';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongooseCache {
    conn: Connection | null;
    promise: Promise<Connection> | null;
}

declare global {
    var mongooseCache: MongooseCache | undefined;
}

const globalCache = global.mongooseCache || { conn: null, promise: null };
global.mongooseCache = globalCache;

export async function connectToDatabase(): Promise<Connection> {
    const cached = global.mongooseCache!;

    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = { bufferCommands: false, maxPoolSize: 10 };
        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => mongoose.connection);
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        throw err;
    }

    if (NODE_ENV === 'development') {
        const { host, name } = cached.conn;
        console.log(`[db] Connected to ${host}/${name} (${NODE_ENV})`);
    }

    return cached.conn;
}
