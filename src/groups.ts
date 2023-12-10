import Elysia from 'elysia';
import userGroups from './groups/user.groups';
import authGroups from './groups/auth.groups';

// see: https://github.com/elysiajs/elysia/issues/95 (still open at this time)
// see: https://github.com/elysiajs/elysia/issues/335 (still open at this time)
// see: https://elysiajs.com/concept/group.html
export default new Elysia()
  .use(authGroups)
  .use(userGroups);
  // .use(postRoutes)
  // .use(commentRoutes);
