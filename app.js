const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const booksRouter = require('./controllers/bookController')
const authorRouter = require('./controllers/authorController')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

console.log("connecting to DB")

mongoose.connect(config.DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("connected to Mongo DB")
    })
    .catch((err) => {
        console.log("connection to Mongo DB failed:", err.message)
    })

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/books', booksRouter)
app.use('/api/authors', authorRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app