const authorRouter = require('express').Router()
const Author = require('../models/author')
  
authorRouter.get('/', (req, res) => {
    Author.find({}).then(authors => {
        res.json(authors)
    })
})

authorRouter.post('/', (req, res) => {
    const body = req.body
    if (!body.name) {
        return res.status(400).json({
            error: "No author sent."
        })
    }
    const author = new Author({
        name: body.name,
        birthDate: body.birthDate,
        bookTitles: body.bookTitles
    })
    author.save().then(savedAuthor => {
        res.json(savedAuthor.toJSON())
    }).catch(error => {
        res.status(400).end()
    })
})

module.exports = authorRouter
