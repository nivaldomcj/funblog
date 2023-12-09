import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import credentials from './credentials';
import * as schema from './schema/';

const client = postgres(credentials);

export default drizzle(client, { schema });
