import { and, asc, eq } from 'drizzle-orm';
import { NotFoundError } from 'elysia';
import db from '../databases/db';
import { comments, posts } from '../databases/schema';
import commentDto from '../dtos/comment.dto';
import { BadRequestError } from '../errors/badrequest.error';
import { setSignInUser } from '../hooks/set-signed-in-user.hook';
import { CustomRequest } from '../types/custom-request.type';
import postGroups from './post.groups';

// Comment is a child of Post
const comment = postGroups.use(commentDto);

comment.get(
  '/:post_id/comment',
  async ({ params: { post_id } }) => {
    if (!post_id) throw new BadRequestError();

    return await db
      .select()
      .from(comments)
      .where(eq(comments.post, post_id))
      .orderBy(asc(comments.created_at));
  },
  {
    beforeHandle: setSignInUser,
    detail: {
      tags: ['comment']
    },
  },
);

comment.post(
  '/:post_id/comment',
  async ({ body: { content }, params: { post_id }, request }) => {
    if (!post_id) throw new BadRequestError();
    const user = (request as CustomRequest).user;

    const post =
      (
        await db
          .select({ id: posts.id })
          .from(posts)
          .where(eq(posts.id, post_id))
          .limit(1)
      ).at(0) || null;
    if (!post) throw new NotFoundError();

    return (
      (
        await db
          .insert(comments)
          .values({ content, author: user.id, post: post.id })
          .returning()
      ).at(0) || null
    );
  },
  {
    beforeHandle: setSignInUser,
    body: 'comment',
    detail: {
      tags: ['comment']
    },
  },
);

comment.get(
  '/:post_id/comment/:comment_id',
  async ({ params: { post_id, comment_id } }) => {
    if (!(post_id && comment_id)) throw new BadRequestError();

    return (
      (
        await db
          .select()
          .from(comments)
          .where(and(eq(comments.post, post_id), eq(comments.id, comment_id)))
          .limit(1)
      ).at(0) || null
    );
  },
  {
    beforeHandle: setSignInUser,
    detail: {
      tags: ['comment']
    },
  },
);

comment.put(
  '/:post_id/comment/:comment_id',
  async ({ params: { post_id, comment_id }, body: { content }, request }) => {
    if (!(post_id && comment_id)) throw new BadRequestError();

    const user = (request as CustomRequest).user;

    const comment =
      (
        await db
          .select()
          .from(comments)
          .where(
            and(
              eq(comments.post, post_id),
              eq(comments.id, comment_id),
              eq(comments.author, user.id),
            ),
          )
          .limit(1)
      ).at(0) || null;
    if (!comment) throw new NotFoundError();

    return (
      (
        await db
          .update(comments)
          .set({ content, updated_at: new Date() })
          .where(
            and(
              eq(comments.post, post_id),
              eq(comments.id, comment_id),
              eq(comments.author, user.id),
            ),
          )
          .returning()
      ).at(0) || null
    );
  },
  {
    beforeHandle: setSignInUser,
    body: 'comment',
    detail: {
      tags: ['comment']
    },
  },
);

// eslint-disable-next-line drizzle/enforce-delete-with-where
comment.delete(
  '/:post_id/comment/:comment_id',
  async ({ params: { post_id, comment_id }, request }) => {
    if (!(post_id && comment_id)) throw new BadRequestError();

    const user = (request as CustomRequest).user;
    const comment =
      (
        await db
          .select()
          .from(comments)
          .where(
            and(
              eq(comments.post, post_id),
              eq(comments.id, comment_id),
              eq(comments.author, user.id),
            ),
          )
          .limit(1)
      ).at(0) || null;
    if (!comment) throw new NotFoundError();

    return (
      (
        await db
          .delete(comments)
          .where(
            and(
              eq(comments.post, post_id),
              eq(comments.id, comment_id),
              eq(comments.author, user.id),
            ),
          )
          .returning()
      ).at(0) || null
    );
  },
  {
    beforeHandle: setSignInUser,
    detail: {
      tags: ['comment']
    },
  },
);

export default comment;
