import { Elysia } from 'elysia';
import { BadRequestError } from './errors/badrequest.errors';
import { ForbiddenError } from './errors/forbidden.errors';
import { auth } from './groups/auth.groups';
import { comment } from './groups/comment.groups';
import { post } from './groups/post.groups';
import { user } from './groups/user.groups';

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
  .use(auth)
  .use(user)
  .use(post)
  .use(comment)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

// TODO? https://elysiajs.com/concept/group.html
// TODO? https://elysiajs.com/plugins/jwt.html
// TODO? https://elysiajs.com/plugins/bearer.html
// TODO? https://elysiajs.com/plugins/swagger.html
// TODO? https://elysiajs.com/concept/life-cycle.html#local-hook
