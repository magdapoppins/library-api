const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Book = require('../models/book')

const api = supertest(app)
const initialBooks = [
    {
        title: "Programming Clojure",
        author: "Unknown",
        publishedYear: 2019,
        genre: "non-fiction"
    }
]

beforeEach(async () => {
    await Book.deleteMany({})
  
    let bookObject = new Book(initialBooks[0])
    await bookObject.save()
})

test('books are returned as JSON', async () => {
    await api
        .get('/api/books')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there is 1 book', async () => {
    const response = await api
        .get('/api/books')
  
    expect(response.body.length).toBe(1)
})

afterAll(() => {
    mongoose.connection.close()
})
