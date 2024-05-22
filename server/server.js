const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { mongoose } = require('mongoose')
const app = express()
const homeRouter = require('./routes/home')

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

// Routes
app.use('/', homeRouter)

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