import Elysia, { t } from "elysia";

export default new Elysia().model({
  'user.profile': t.Object({
    name: t.Capitalize(t.String({ maxLength: 256 })),
  }),

  'user.changePassword': t.Object({
    oldPassword: t.String({ minLength: 3, maxLength: 128 }),
    newPassword: t.String({ minLength: 3, maxLength: 128 }),
  })
});
