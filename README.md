# funblog

This is a simple "blog" backend project I did for fun to learn while I'm learning the following stack:

- Bun
- ElysiaJS
- DrizzleORM with PostgreSQL

### How to run?

- Install bun
- Checkout project
- Run with: ```bun dev```
- ...?

### List of things to do

This is just for myself to remember what to do here. Hope it will be fully finished.

- [ ] Implement models:
    - [ ] User model: id, username, e-mail, password, created_at
    - [ ] Post model: id, title, content, author[user], created_at, updated_at
    - [ ] Comment model: id, author[user], [post], text, created_at, updated_at
- [ ] Implement routes:
    - [ ] POST /login => do login
    - [ ] POST /register => create new user
    - [ ] PUT /profile => update user data [need auth]
    - [ ] GET /users/:id => get user info by id [need auth]
    - [ ] GET /posts => list all posts
    - [ ] GET /posts/:id => get post by id
    - [ ] POST /posts => create new post [need auth]
    - [ ] PUT /posts/:id => update post [need auth] (update own post)
    - [ ] DELETE /posts/:id => delete post [need auth] (delete own post)
    - [ ] GET /posts/:id/comments => list post comments
    - [ ] POST /posts/:id/comments => create new comment [need auth]
    - [ ] GET /posts/:id/comments/:id => get comment by id [need auth]
    - [ ] PUT /posts/:id/comments/:id => update a comment by id [need auth]
    - [ ] DELETE /posts/:id/comments/:id => delete a comment by id [need auth]
- [ ] Tasks:
    - [ ] Implement auth (JWT?)
    - [ ] Implement pagination
    - [ ] Add filters to search posts by something
- [ ] Extras:
    - [x] ~~Create docker-compose file~~
    - [ ] Create Dockerfile
    - [ ] Rewrite "how to run" section
    - [ ] Implement GraphQL?
