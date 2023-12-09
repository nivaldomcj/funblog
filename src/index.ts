import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

// TODO? https://elysiajs.com/concept/group.html
// TODO? https://elysiajs.com/plugins/jwt.html
// TODO? https://elysiajs.com/plugins/bearer.html
// TODO? https://elysiajs.com/plugins/swagger.html
// TODO? https://elysiajs.com/concept/life-cycle.html#local-hook
