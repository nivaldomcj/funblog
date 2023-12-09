import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import credentials from './credentials';

const sql = postgres(credentials);
const db = drizzle(sql);

await migrate(db, { migrationsFolder: './src/databases/migrations' });
