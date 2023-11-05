class RootController {
  constructor(dao) {
    this.dao = new dao()
  }
  async findAll(_, res) {
    try {
      const data = await this.dao.findAll()
      res.json(data[0])
    } catch (e) {
      console.error(e);
      res.status(500).json(e.message)
    }
  }
  async findOne(req, res) {
    try {
      const data = await this.dao.findOne(parseInt(req.params.id))
      res.json(data[0])
    } catch (e) {
      console.log(e);
      res.status(500).json(e.message)
    }
  }
  async create(req, res) {
    try {
      const data = await this.dao.create(req.body)
      if (data[0].affectedRows) {
        res.sendStatus(201)
      } else {
        res.sendStatus(400)
      }
    } catch (e) {
      console.error(e);
      res.status(500).json(e.message)
    }
  }
  async update(req, res) {
    try {
      const data = await this.dao.update(parseInt(req.params.id), req.body)
      if (data[0].affectedRows) {
        res.sendStatus(201)
      } else {
        res.status(400).json("Bad data")
      }
    } catch (e) {
      console.error(e);
      res.status(500).json(e.message)
    }
  }
  async delete(req, res) {
    try {
      const data = await this.dao.delete(parseInt(req.params.id))
      if (data[0].affectedRows) {
        res.sendStatus(200)
      } else {
        res.status(400).json("No rows affected")
      }
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

module.exports = RootController