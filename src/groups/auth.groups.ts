import { eq } from 'drizzle-orm';
import Elysia from 'elysia';
import db from '../databases/db';
import { users } from '../databases/schema';
import { BadRequestError } from '../errors/badrequest.errors';
import authModel from '../models/auth.model';
import { hashPassword, isMatchPassword } from '../utils/password';
import jwtPlugin from '../plugins/jwt.plugin';

const auth = new Elysia()
  .use(jwtPlugin)
  .use(authModel);

auth.post(
  '/login',
  async ({ body, jwt }) => {
    const { email, password } = body;

    const user = (
      await db
        .select({ email: users.email, password: users.password })
        .from(users)
        .where(eq(users.email, email))
        .limit(1)
    ).at(0);

    const isValidCredentials = user && await isMatchPassword(password, user.password);
    if (!isValidCredentials) {
      throw new BadRequestError('Invalid credentials. Please try again.');
    }

    // we could have added more things here, but let's simplify 😊
    return jwt.sign({ email });
  },
  { body: 'auth.login' },
);

auth.post(
  '/register',
  async ({ body }) => {
    const { email, password, name } = body;

    const user = (
      await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email))
        .limit(1)
    ).at(0);

    if (user) {
      throw new BadRequestError('A user with this email already exists.');
    }

    return (
      await db
        .insert(users)
        .values({
          email,
          password: await hashPassword(password),
          name,
        })
        .returning({
          id: users.id,
          email: users.email,
          name: users.name,
        })
    ).at(0);
  },
  { body: 'auth.register' },
);

export default auth;
