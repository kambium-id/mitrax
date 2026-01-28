import { Pool } from 'pg';

// Use a global variable to store the pool instance in development
// to avoid creating multiple pools during hot reloading.
const globalForDb = global as unknown as { db: Pool };

export const db =
  globalForDb.db ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: true,
    },
    // Pool configuration
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

if (process.env.NODE_ENV !== 'production') globalForDb.db = db;
