import Elysia from 'elysia';
import userModel from '../models/user.model';
import jwtPlugin from '../plugins/jwt.plugin';
import bearer from '@elysiajs/bearer';
import { isTokenValid } from '../hooks/is-token-valid.hook';
import { injectSignedInUser } from '../hooks/inject-signed-in-user.hook';
import { CustomRequest } from '../types/custom-request.type';

const user = new Elysia({ prefix: '/user' })
  .use(userModel)
  .use(jwtPlugin)
  .use(bearer());

user.get('/profile', ({ request }) => {
  const { email, name } = (request as CustomRequest).user
  return { email, name };
}, {
  beforeHandle: [isTokenValid, injectSignedInUser]
});

// TODO
user.get('/profile/:id', ({ body }) => { });

// TODO
user.put('/profile', ({ body }) => {}, { body: 'user.profile' });

// TODO
user.patch('/change-password', ({ body }) => { }, {
  body: 'user.changePassword',
});

export default user;
