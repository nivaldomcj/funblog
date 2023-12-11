import bearer from '@elysiajs/bearer';
import { eq, and, desc } from 'drizzle-orm';
import Elysia, { NotFoundError } from 'elysia';
import db from '../databases/db';
import { posts } from '../databases/schema/posts.schema';
import { setSignInUser } from '../hooks/set-signed-in-user.hook';
import jwtPlugin from '../plugins/jwt.plugin';
import { CustomRequest } from '../types/custom-request.type';
import postDto from '../dtos/post.dto';
import { comments } from '../databases/schema';

const post = new Elysia({ prefix: '/post' })
  .use(postDto)
  .use(jwtPlugin)
  .use(bearer());

post.get(
  '/',
  async () => {
    return await db.select().from(posts).orderBy(desc(posts.created_at));
  },
  {
    beforeHandle: setSignInUser
  },
);

post.get(
  '/:post_id',
  async ({ params: { post_id } }) => {
    return (
      await db
        .select()
        .from(posts)
        .where(eq(posts.id, post_id))
        .limit(1)
    ).at(0) || null;
  },
  {
    beforeHandle: setSignInUser
  }
);

post.post(
  '/',
  async ({ body, request }) => {
    const { title, content } = body;
    const user = (request as CustomRequest).user;

    return (
      await db
        .insert(posts)
        .values({ title, content, author: user.id })
        .returning()
    ).at(0) || null;
  },
  {
    beforeHandle: setSignInUser,
    body: 'post',
  }
);

post.put(
  '/:post_id',
  async ({ body, params: { post_id }, request }) => {
    const { title, content } = body;

    const user = (request as CustomRequest).user;
    const post = (
      await db
        .select()
        .from(posts)
        .where(and(eq(posts.id, post_id), eq(posts.author, user.id)))
        .limit(1)
    ).at(0) || null;
    if (!post) {
      throw new NotFoundError();
    }

    return (
      await db
        .update(posts)
        .set({ title, content, updated_at: new Date() })
        .where(and(eq(posts.id, post_id), eq(posts.author, user.id)))
        .returning()
    ).at(0) || null;
  },
  {
    beforeHandle: setSignInUser,
    body: 'post',
  }
);

// eslint-disable-next-line drizzle/enforce-delete-with-where
post.delete(
  '/:post_id',
  async ({ params: { post_id }, request }) => {
    const user = (request as CustomRequest).user;

    const post = (
      await db
        .select()
        .from(posts)
        .where(and(eq(posts.id, post_id), eq(posts.author, user.id)))
        .limit(1)
    ).at(0) || null;
    if (!post) {
      throw new NotFoundError();
    }

    await db.delete(comments).where(eq(comments.post, post_id));
    return (
      await db
        .delete(posts)
        .where(and(eq(posts.id, post_id), eq(posts.author, user.id)))
        .returning()
    ).at(0) || null;
  },
  {
    beforeHandle: setSignInUser
  }
);

export default post;
