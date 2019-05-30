const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

// Connect to MongoDB Atlas (creds in dotenv file)
const mongoURL = process.env.DB_URL
mongoose.connect(mongoURL, { useNewUrlParser: true }).then(() => {
        console.log("connected to mongodb atlas")
}).catch((err) => console.log(err))

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        required: true
    },
    author: {
        type: String,
        minlength: 5,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
})

bookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Book', bookSchema)
