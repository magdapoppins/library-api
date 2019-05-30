# Dummy Library API

## Getting started
1) Clone project.
2) Create MongoDB Atlas cluster.
3) Add `.env`-file with PORT and DB_URL (URL to MongoDB Atlas) variables.
4) Run `npm install`.
5) Run `npm run watch` to develop.

## Available endpoints  
`GET /books`  
`GET /books/:id`  
`POST /books`  
`DELETE /books/:id`  
`PUT /books/:id`  

## Built with
- Express.js
- Mongoose 5.5
- MongoDB
- Nodemon
- dotenv
- cors