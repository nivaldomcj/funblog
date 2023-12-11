import { eq } from 'drizzle-orm';
import db from '../databases/db';
import { users } from '../databases/schema';
import { UnauthorizedError } from '../errors/unauthorized.error';

export const setSignInUser = async ({
  bearer,
  jwt,
  request,
}: {
  bearer: string | undefined;
  jwt: any;
  request: any;
}) => {
  const payload = await jwt.verify(bearer);
  const { email }: { email: string | null } = payload;

  if (!bearer || !payload || !email) {
    throw new UnauthorizedError();
  }

  const result = (
    await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
  ).at(0);

  if (!result) {
    throw new UnauthorizedError();
  }

  request.user = result;
};
