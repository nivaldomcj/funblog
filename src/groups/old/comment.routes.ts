import {
  createComment,
  deleteComment,
  getComment,
  listComments,
  updateComment,
} from '../../handlers/comment.handlers';
import postRoutes from './post.routes';

// Comment is a child of Post
export default postRoutes
  .get('/:postId/comment', listComments)
  .get('/:postId/comment/:commentId', getComment)
  .post('/:postId/comment', createComment)
  .put('/:postId/comment/:commentId', updateComment)
  .delete('/:postId/comment/:commentId', deleteComment);
