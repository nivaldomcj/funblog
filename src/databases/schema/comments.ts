import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { users } from './users';

export const comments = pgTable('comments', {
  id: uuid('id').defaultRandom().unique().primaryKey(),
  author: uuid('author_id').references(() => users.id),
  post: uuid('post_id').references(() => posts.id),
  content: text('content'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
