const RootController = require('./rootController')
const UsersDao = require('../views/usersDao')
class UsersController extends RootController {
  constructor() {
    super(UsersDao)

  }
  async findOneByLogin(req, res) {
    try {
      const data = await this.dao.findOneByLogin(req.params.login)
      res.json(data[0])
    } catch (e) {
      console.error(e);
      res.status(500).json(e.message)
    }
  }
  async auth(req, res) {
    try {
      const data = await this.dao.auth(req.params.login, req.body.password)

      res.json(!!data[0].length)
    } catch (e) {
      console.error(e);
      res.status(500).json(e.message)
    }
  }
}

module.exports = UsersController