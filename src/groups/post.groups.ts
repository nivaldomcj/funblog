import Elysia from 'elysia';
import {
  createPost,
  deletePost,
  getPost,
  listPosts,
  updatePost,
} from '../handlers/post.handlers';

export const post = new Elysia({ prefix: 'post' })
  .get('/', listPosts)
  .get('/:postId', getPost)
  .post('/', createPost)
  .put('/:postId', updatePost)
  .delete('/:postId', deletePost);
