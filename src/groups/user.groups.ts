import bearer from '@elysiajs/bearer';
import { eq } from 'drizzle-orm';
import Elysia, { NotFoundError } from 'elysia';
import db from '../databases/db';
import { users } from '../databases/schema';
import { injectSignedInUser } from '../hooks/inject-signed-in-user.hook';
import userModel from '../models/user.model';
import jwtPlugin from '../plugins/jwt.plugin';
import { CustomRequest } from '../types/custom-request.type';

const user = new Elysia({ prefix: '/user' })
  .use(userModel)
  .use(jwtPlugin)
  .use(bearer());

user.get(
  '/profile',
  ({ request }) => {
    const { id, email, name } = (request as CustomRequest).user;
    return { id, email, name };
  },
  {
    beforeHandle: injectSignedInUser,
  },
);

user.get(
  '/profile/:id',
  async ({ params: { id } }) => {
    const user = (
      await db
        .select({ id: users.id, email: users.email, name: users.name })
        .from(users)
        .where(eq(users.id, id))
        .limit(1)
    ).at(0);
    if (!user) throw new NotFoundError();
    return user;
  },
  {
    beforeHandle: injectSignedInUser,
  },
);

user.patch('/profile', async ({ body: { name }, request }) => {
  const { id } = (request as CustomRequest).user;

  return (
    await db
    .update(users)
    .set({ name })
    .where(eq(users.id, id))
    .returning({ id: users.id, email: users.email, name: users.name })
  ).at(0);
}, { beforeHandle: injectSignedInUser, body: 'user.profile',  });

// TODO
user.patch('/change-password', ({ body }) => {}, {
  body: 'user.changePassword',
});

export default user;
