const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const authorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthDate: Date,
    bookTitles: [String]
})

authorSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Author', authorSchema)
