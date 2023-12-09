import Elysia from 'elysia';
import authRoutes from './routes/auth.routes';
import commentRoutes from './routes/comment.routes';
import postRoutes from './routes/post.routes';
import userRoutes from './routes/user.routes';

export default new Elysia()
  .use(authRoutes)
  .use(userRoutes)
  .use(postRoutes)
  .use(commentRoutes);
