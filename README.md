# Nodejs, Express.js, MongoDB API
Creating a basic CRUD API using Node as backend, Express web framework, MongoDB and Mongoose.

# Before you get started
- Understanding of NOSQL databases (Mongodb)
- Understanding of API and relevant HTTP methods (POST, GET, PATCH, DELETE)
- Basic Javascript (ES6)
- Basic Node

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

# Contributors
- Daniel Corcoran

# Sources
- [Mongoose Documentation](https://mongoosejs.com/)
- [Express Documentation](https://expressjs.com/)
