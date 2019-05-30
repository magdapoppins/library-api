const booksRouter = require('express').Router()
const Book = require('../models/book')
  
booksRouter.get('/', (req, res) => {
    Book.find({}).then(books => {
        res.json(books)
    })
})

booksRouter.get('/:id', (req, res) => {
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

booksRouter.delete('/:id', (req, res) => {
    const id = req.params.id
    Book.findByIdAndRemove(id).then(book => {
        res.status(204).end()
    }).catch(err => {
        res.status(404).end()
    })
})

booksRouter.post('/', (req, res) => {
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

booksRouter.put('/:id', (req, res) => {
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

module.exports = booksRouter