const RootController = require('./rootController')
const BooksDao = require('../views/booksDao')
class BooksController extends RootController {
  constructor() {
    super(BooksDao)
  }
  async findByAuthor(req, res) {
    try {
      const data = await this.dao.findByAuthor(parseInt(req.params.id))
      res.json(data[0])
    } catch (e) {
      console.error(e);
      res.status(500).json(e.message)
    }
  }
  async findByGenre(req, res) {
    try {
      const data = await this.dao.findByGenre(req.params.genre)
      res.json(data[0])
    } catch (e) {
      console.error(e);
      res.status(500).json(e.message)
    }
  }
  async findByPublisher(req, res) {
    try {
      const data = await this.dao.findByPublisher(req.params.publisher)
      res.json(data[0])
    } catch (e) {
      console.error(e);
      res.status(500).json(e.message)
    }
  }
  async findOneJoined(req, res) {
    try {
      const data = await this.dao.findOneJoined(parseInt(req.params.id))
      res.json(data[0])
    } catch (e) {
      console.log(e);
      res.status(500).json(e.message)
    }
  }
}

module.exports = BooksController