import Elysia, { t } from 'elysia';

export default new Elysia().model({
  'auth.login': t.Object({
    email: t.String({ format: 'email', maxLength: 256 }),
    password: t.String({ minLength: 3, maxLength: 128 }),
  }),
  'auth.register': t.Object({
    email: t.String({ format: 'email', maxLength: 256 }),
    password: t.String({ minLength: 8, maxLength: 128 }),
    name: t.String({ maxLength: 256 }),
  })
});
