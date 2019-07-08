# Nodejs, Express.js, MongoDB API
Creating a CRUD API using Node as backend, Express web framework, MongoDB and Mongoose. Includes json web token authentication system.

# Before you get started
- NOSQL databases (Mongodb)
- API and relevant HTTP methods (POST, GET, PATCH, DELETE)
- Bcrypt/json web tokens
- Javascript (ES6)
- Nodejs 

# Setup

**Installing Depencendies**

Dependencies and versions are listed in the package.json "dependencies" key, and can be installed via the following command from root:

```sh
npm install
```

**Installation of nodemon**

This project uses nodemon for hot reloading
I installed it globally using:

```sh
npm install nodemon -g
```

**Installation of Mongodb**

This project requires `Mongodb` instance (currently configured to localhost (127.0.0.1) on port 27107)

**Installation of Node**

This project requires `nodejs` to run.

**Starting the dev server**

`nodemon` will auto reload the server upon file changes.

```sh
nodemon server.js
```

# Tests
- Retrieving cities with **GET** method in postman.
- Deleting a city with **DELETE** method in postman.
- Updating a city with **PATCH** method in postman.
- Creating a city with **POST** method in postman.
- Creating a new account via /api/auth/register.
- Restricting DELETE, PATCH, POST city routes to authenticated users.

# Contributors
- Daniel Corcoran

# Sources
- [Mongoose Documentation](https://mongoosejs.com/)
- [Express Documentation](https://expressjs.com/)
