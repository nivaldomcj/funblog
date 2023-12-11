import bearer from '@elysiajs/bearer';
import { eq } from 'drizzle-orm';
import Elysia from 'elysia';
import db from '../databases/db';
import { posts } from '../databases/schema/posts.schema';
import { setSignInUser } from '../hooks/set-signed-in-user.hook';
import postModel from '../dtos/models/post.dto';
import jwtPlugin from '../plugins/jwt.plugin';
import { CustomRequest } from '../types/custom-request.type';

const post = new Elysia({ prefix: '/post' })
  .use(postModel)
  .use(jwtPlugin)
  .use(bearer());

post.get(
  '/',
  async () => {
    return await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        created_at: posts.created_at,
        updated_at: posts.updated_at,
      })
      .from(posts);
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

// TODO
post.put('/', ({}) => {}, {});

// TODO
post.delete('/:post_id', ({}) => {}, {});

export default post;
