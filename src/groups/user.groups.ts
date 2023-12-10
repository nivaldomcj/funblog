import Elysia, { NotFoundError } from 'elysia';
import userModel from '../models/user.model';
import jwtPlugin from '../plugins/jwt.plugin';
import bearer from '@elysiajs/bearer';
import { isTokenValid } from '../hooks/is-token-valid.hook';
import { injectSignedInUser } from '../hooks/inject-signed-in-user.hook';
import { CustomRequest } from '../types/custom-request.type';
import db from '../databases/db';
import { users } from '../databases/schema';
import { eq } from 'drizzle-orm';

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
    beforeHandle: [isTokenValid, injectSignedInUser],
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
    beforeHandle: [isTokenValid, injectSignedInUser],
  },
);

// TODO
user.put('/profile', ({ body }) => {}, { body: 'user.profile' });

// TODO
user.patch('/change-password', ({ body }) => {}, {
  body: 'user.changePassword',
});

export default user;
