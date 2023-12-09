import Elysia from 'elysia';
import { getUser, profile } from '../handlers/user.handlers';

export const user = new Elysia({ prefix: 'user' })
  .get('/', profile)
  .get('/:userId', getUser);
