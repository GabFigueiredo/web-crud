const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { mongoose } = require('mongoose')
const homeRouter = require('./routes/post')
const imageRouter = require('./routes/image')
const dataRouter = require('./routes/data')
const getImageRouter = require('./routes/getImage')
const deleteRouter = require('./routes/delete')
const path = require('path')

const app = express()

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use('/files', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/', homeRouter)
app.use('/', imageRouter)
app.use('/', dataRouter)
app.use('/', getImageRouter)
app.use('/', deleteRouter)

// Connect to database
try {
    mongoose.connect('mongodb://localhost:27017/CRUD')
    console.log("Connected to database")
} catch {
    console.log("Couldn't connect to database")
}

// Open the server
try {
    app.listen(5000, () => console.log('Server running at localhost:5000'))
} catch(error) {
    console.log('Algum erro', error)
}