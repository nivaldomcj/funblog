import { Elysia } from "elysia";
import { auth } from "./groups/auth.groups";
import { comment } from "./groups/comment.groups";
import { user } from "./groups/user.groups";
import { post } from "./groups/post.groups";

const app = new Elysia()
  .use(auth)
  .use(user)
  .use(post)
  .use(comment)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

// TODO? https://elysiajs.com/concept/group.html
// TODO? https://elysiajs.com/plugins/jwt.html
// TODO? https://elysiajs.com/plugins/bearer.html
// TODO? https://elysiajs.com/plugins/swagger.html
// TODO? https://elysiajs.com/concept/life-cycle.html#local-hook
