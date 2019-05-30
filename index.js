require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Book = require('./models/book')
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } 

    next(error)
}

app.use(bodyParser.json())
app.use(cors())
app.use(errorHandler)
  
app.get('/books', (req, res) => {
    Book.find({}).then(books => {
        res.json(books)
    })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id
    Book.findById(id).then(book => {
        if (book) {
            res.json(book)
        } else {
            res.status(404).end()
        }
    }).catch(err => {
        res.status(400).end()
    })
})

app.delete('/books/:id', (req, res) => {
    const id = req.params.id
    Book.findByIdAndRemove(id).then(book => {
        res.status(204).end()
    }).catch(err => {
        res.status(404).end()
    })
})

app.post('/books', (req, res) => {
    const body = req.body
    if (!body.title) {
        return res.status(400).json({
            error: "No book sent."
        })
    }
    const book = new Book({
        title: body.title,
        author: body.author,
        publishedYear: body.publishedYear,
        genre: body.genre
    })
    book.save().then(savedBook => {
        res.json(savedBook.toJSON())
    }).catch(error => {
        res.status(400).end()
    })
})

app.put('/books/:id', (req, res) => {
    const id = req.params.id

    Book.findByIdAndUpdate(id, {
        title: req.body.title,
        author: req.body.author,
        publishedYear: req.body.publishedYear,
        genre: req.body.genre
    }, { 
        new: true 
    }).then(updatedBook => {
        res.json(updatedBook.toJSON())
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})