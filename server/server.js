const { mongoose } = require('mongoose')
const routes = require('./routes/routes.js')
const middlewares = require('./middlewares/middlewares.js')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = require("./index.js")

app.use(middlewares)

// Connect to database
try {
    mongoose.connect('mongodb://localhost:27017/CRUD')
    console.log("Connected to database")
} catch {
    console.log("Couldn't connect to database")
}

app.use(routes)

// Open the server
try {
    app.listen(PORT, () => console.log('Server running at localhost:5000'))
} catch (error) {
    console.log('Erro ao conectar ao servidor', error)
}
