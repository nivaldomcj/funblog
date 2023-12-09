// import Elysia from 'elysia';
// import { login, loginHandler, register } from '../handlers/auth.handlers';
// import authDto from '../models/auth.models';

// export default new Elysia()
//   .use(loginHandler)
//   .post('/register', register, { body: 'auth.register' });

import Elysia, { Context } from 'elysia';
import authModel from '../models/auth.models';

const auth = new Elysia().use(authModel);

auth.post('/login', ({ body, set }: Context) => {

}, { body: 'auth.login' });

export default auth;
