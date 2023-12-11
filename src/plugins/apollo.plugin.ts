import apollo from '@elysiajs/apollo';
import db from '../databases/db';
import { posts } from '../databases/schema';
import postsGql from '../gqls/posts.gql';

export default apollo({
  path: '/graphql',
  typeDefs: postsGql,
  resolvers: {
    Query: {
      posts: async () => await db.select().from(posts),
    },
  },
});
