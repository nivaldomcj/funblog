import Elysia from 'elysia';
import commentRoutes from './groups/comment.routes';
import postRoutes from './groups/post.routes';
import userRoutes from './groups/user.routes';
import authGroup from './groups/auth.groups';

// see: https://github.com/elysiajs/elysia/issues/95 (still open at this time)
// see: https://github.com/elysiajs/elysia/issues/335 (still open at this time)
// see: https://elysiajs.com/concept/group.html
export default new Elysia()
  .use(authGroup)
  .use(userRoutes)
  .use(postRoutes)
  .use(commentRoutes);
