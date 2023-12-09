import { Elysia } from 'elysia';
import { BadRequestError } from './errors/badrequest.errors';
import { ForbiddenError } from './errors/forbidden.errors';
import groups from './groups';

const app = new Elysia()
  .error({
    BAD_REQUEST: BadRequestError,
    FORBIDDEN: ForbiddenError,
  })
  .onError(({ code, error }) => {
    switch (code) {
      // https://github.com/elysiajs/elysia/issues/313
      case 'VALIDATION':
        return error.all;

      // our custom errors
      default:
        return { code, message: error.message };
    }
  })
  .use(groups)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

// TODO? https://elysiajs.com/concept/group.html
// TODO? https://elysiajs.com/plugins/jwt.html
// TODO? https://elysiajs.com/plugins/bearer.html
// TODO? https://elysiajs.com/plugins/swagger.html
// TODO? https://elysiajs.com/concept/life-cycle.html#local-hook
