import Elysia, { t } from 'elysia';

export default new Elysia().model({
  'comment': t.Object({
    content: t.String({ minLength: 1 }),
  }),
});
