import Elysia from 'elysia';
import { login, register } from '../handlers/auth.handlers';
import { authModel } from '../models/auth.models';

export const auth = new Elysia()
  .use(authModel)
  .post('/login', login, { body: 'auth.login' })
  .post('/register', register, { body: 'auth.register' });
