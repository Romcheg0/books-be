const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
app.use(cors())

const UsersController = require('./controllers/usersController')
const usersController = new UsersController()
const BooksController = require('./controllers/booksController')
const booksController = new BooksController()

app.get('/users', usersController.findAll.bind(usersController))
app.get('/users/:id', usersController.findOne.bind(usersController))
app.get('/users/login/:login', usersController.findOneByLogin.bind(usersController))
app.put('/users/:id', bodyParser.json(), usersController.update.bind(usersController))
app.post('/users', bodyParser.json(), usersController.create.bind(usersController))
app.post('/users/auth/:login', bodyParser.json(), usersController.auth.bind(usersController))
app.delete('/users/:id', usersController.delete.bind(usersController))

app.get('/books', booksController.findAll.bind(booksController))
app.get('/books/:id', booksController.findOne.bind(booksController))
app.get('/books/author/:id', booksController.findByAuthor.bind(booksController))
app.get('/books/genre/:genre', booksController.findByGenre.bind(booksController))
app.get('/books/publisher/:publisher', booksController.findByPublisher.bind(booksController))
app.get('/books/joined/:id', booksController.findOneJoined.bind(booksController))
app.put('/books/:id', bodyParser.json(), booksController.update.bind(booksController))
app.post('/books', bodyParser.json(), booksController.create.bind(booksController))
app.delete('/books/:id', booksController.delete.bind(booksController))

app.listen(process.env.PORT || 5000, () => {
  console.log('App listening on ' + process.env.PORT || 5000);
})