import { eq } from 'drizzle-orm';
import { users } from '../databases/schema';
import { UnauthorizedError } from '../errors/unauthorized.error';
import db from '../databases/db';

export const isTokenValid = async ({ bearer, jwt }) => {
  const payload = await jwt.verify(bearer);
  const { email }: { email: string | null } = payload;

  if (!bearer || !payload || !email) {
    throw new UnauthorizedError();
  }

  const result = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!result) {
    throw new UnauthorizedError();
  }
};

