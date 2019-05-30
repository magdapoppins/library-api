# Dummy Library API

## Getting started
1) Clone project.
2) Create MongoDB Atlas cluster.
3) Add `.env`-file with PORT and DB_URL (URL to MongoDB Atlas) variables.
4) Run `npm install`.
5) Run `npm run watch` to develop.

## Available endpoints  
`GET /api/books`  
`GET /api/books/:id`  
`POST /api/books`  
`DELETE /api/books/:id`  
`PUT /api/books/:id` 
`GET /api/authors`  
`POST /api/authors` 

## Built with
- Express.js
- Mongoose 5.5
- MongoDB
- Nodemon
- dotenv
- cors
- jest
- supertest
- lodash
