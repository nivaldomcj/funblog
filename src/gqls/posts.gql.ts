import { gql } from "@elysiajs/apollo";

export default gql`
  type Post {
    title: String
    text: String
  }

  type Query {
    posts: [Post]
  }
`;
