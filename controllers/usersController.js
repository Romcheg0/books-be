const RootController = require('./rootController')
const UsersDao = require('../views/usersDao')
class UsersController extends RootController {
  constructor() {
    super(UsersDao)
  }
}

module.exports = UsersController