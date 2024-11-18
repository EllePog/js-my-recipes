
const express = require('express')
const colors = require('ansi-colors')
const { route } = require('./routes/pages/recipes')
const app = express()
const port = 3010

// middleware
app.use(express.static('public'))
app.use(express.json())

// routes
app.use('/', require('./routes/api/v1/recipes.js'))
app.use('/', require('./routes/pages/recipes'))

// server
const url = colors.blue('http://localhost:3010/')
const message = `Server is running on port ${port}. Visit ${url} in your browser.`
app.listen(port, () => console.log(message))
