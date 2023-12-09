import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().unique().primaryKey(),
  email: varchar('email', { length: 256 }),
  password: varchar('password', { length: 128 }),
  name: varchar('name', { length: 256 }),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
