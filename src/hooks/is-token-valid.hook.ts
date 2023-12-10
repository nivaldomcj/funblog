import { UnauthorizedError } from '../errors/unauthorized.error';

export const isTokenValid = async ({ bearer, jwt }) => {
  if (!bearer || !(await jwt.verify(bearer))) {
    throw new UnauthorizedError();
  }
};

