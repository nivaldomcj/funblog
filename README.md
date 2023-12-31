# funblog

This is a simple "blog" backend project I did for fun while I was learning the following stack:

- Bun
- ElysiaJS
- DrizzleORM
- PostgreSQL

### How to run?

- Install docker & docker compose
- Clone this project
- Run it with `docker compose up -d`

### List of things to do

This is just for myself to remember what to do here. Hope it will be fully finished.

- ✔️ Implement entities:
    - ✔️ User entities: id, username, e-mail, password, created_at
    - ✔️ Post entities: id, title, content, author[user], created_at, updated_at
    - ✔️ Comment entities: id, author[user], [post], text, created_at, updated_at
- ✔️ Implement routes:
    - ✔️ POST /login => do login with token (JWT)
    - ✔️ POST /register => create user
    - ✔️ GET /profile => get user data [need auth]
    - ✔️ PUT /profile => update user data [need auth]
    - ✔️ GET /users/:id => get user info by id [need auth]
    - ✔️ GET /users/change-password => change user password [need auth]
    - ✔️ GET /posts => list all posts
    - ✔️ GET /posts/:id => get post by id
    - ✔️ POST /posts => create post [need auth]
    - ✔️ PUT /posts/:id => update post [need auth] (update own post)
    - ✔️ DELETE /posts/:id => delete post [need auth] (delete own post)
    - ✔️ GET /posts/:id/comments => list post comments
    - ✔️ POST /posts/:id/comments => create comment [need auth]
    - ✔️ GET /posts/:id/comments/:id => get comment by id [need auth]
    - ✔️ PUT /posts/:id/comments/:id => update a comment by id [need auth]
    - ✔️ DELETE /posts/:id/comments/:id => delete a comment by id [need auth]
- ✔️ Extras:
    - ✔️ Create docker-compose file
    - ✔️ Add swagger plugin
    - ✔️ Create Dockerfile
    - ✔️ Rewrite "how to run" section
    - ✔️ Implement simple GraphQL query
