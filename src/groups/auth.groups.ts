import Elysia from 'elysia';
import { login, register } from '../handlers/auth.handlers';

export const auth = new Elysia()
  .post('/login', login)
  .post('/register', register);
