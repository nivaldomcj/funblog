import bearer from '@elysiajs/bearer';
import { eq } from 'drizzle-orm';
import Elysia, { NotFoundError } from 'elysia';
import db from '../databases/db';
import { users } from '../databases/schema';
import { BadRequestError } from '../errors/badrequest.error';
import { setSignInUser } from '../hooks/set-signed-in-user.hook';
import userModel from '../dtos/models/user.dto';
import jwtPlugin from '../plugins/jwt.plugin';
import { CustomRequest } from '../types/custom-request.type';
import { hashPassword, isMatchPassword } from '../utils/password.utils';

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
    beforeHandle: setSignInUser,
  },
);

user.get(
  '/profile/:user_id',
  async ({ params: { user_id } }) => {
    const user = (
      await db
        .select({ id: users.id, email: users.email, name: users.name })
        .from(users)
        .where(eq(users.id, user_id))
        .limit(1)
    ).at(0);
    if (!user) throw new NotFoundError();
    return user;
  },
  {
    beforeHandle: setSignInUser,
  },
);

user.patch(
  '/profile',
  async ({ body: { name }, request }) => {
    const { id } = (request as CustomRequest).user;

    return (
      await db
        .update(users)
        .set({ name })
        .where(eq(users.id, id))
        .returning({ id: users.id, email: users.email, name: users.name })
    ).at(0);
  },
  {
    beforeHandle: setSignInUser,
    body: 'user.profile',
  },
);

user.patch(
  '/change-password',
  async ({ body: { oldPassword, newPassword }, request, set }) => {
    const { id, password } = (request as CustomRequest).user;
    const isOldPasswordCorrect = await isMatchPassword(oldPassword, password);

    if (!isOldPasswordCorrect) {
      throw new BadRequestError('Old password is incorrect. Please try again.');
    }

    const hashedNewPassword = await hashPassword(newPassword);
    await db
      .update(users)
      .set({ password: hashedNewPassword })
      .where(eq(users.id, id));

    // nothing to do...
    set.status = 204;
  },
  {
    beforeHandle: setSignInUser,
    body: 'user.changePassword',
  },
);

export default user;
