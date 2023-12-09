import Elysia from 'elysia';
import { getUser, profile } from '../handlers/user.handlers';

export default new Elysia({ prefix: 'user' })
  .get('/', profile)
  .get('/:userId', getUser);
