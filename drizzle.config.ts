import type { Config } from 'drizzle-kit';
import credentials from './src/databases/credentials';

export default {
  schema: './src/databases/schema/*',
  out: './src/databases/migrations',
  driver: 'pg',
  dbCredentials: credentials,
} satisfies Config;
