import Elysia, { t } from "elysia";

export default new Elysia().model({
  'post': t.Object({
    title: t.String({ minLength: 1, maxLength: 256 }),
    content: t.String({ minLength: 1 }),
  }),
});
