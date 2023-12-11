import Elysia from 'elysia';
import userGroups from './groups/user.groups';
import authGroups from './groups/auth.groups';
import postGroups from './groups/post.groups';

// see: https://elysiajs.com/concept/group.html
export default new Elysia()
  .use(authGroups)
  .use(userGroups)
  .use(postGroups);
  // .use(commentRoutes);
