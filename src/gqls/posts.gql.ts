import { gql } from "@elysiajs/apollo";

export default gql`
  type Post {
    title: String
    content: String
  }

  type Query {
    posts: [Post]
  }
`;
