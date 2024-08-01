const express = require('express')
const path = require('path')
const routes = require('./routes/routes.js')
const middlewares = require('./middlewares/middlewares.js')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = require("./index.js")

// Middlewares
middlewares.forEach(middleware => app.use(middleware))
app.use('/files', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use(routes)


// Open the server
try {
    app.listen(PORT, () => console.log('Server running at localhost:5000'))
} catch (error) {
    console.log('Erro ao conectar ao servidor', error)
}
