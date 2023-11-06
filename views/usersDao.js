const mysql2 = require('mysql2/promise')
const Dao = require('./dao')
class UsersDao extends Dao {
  constructor() {
    super('users')
  }
  async create(body) {
    const pool = mysql2.createPool(this.config)
    const query = `
    INSERT INTO ${this.table} 
      (
        ${Object.keys(body).join(', ')}
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`
    const data = await pool.query(query, [...Object.values(body)])
    pool.end()
    return data
  }

  async findOneByLogin(login) {
    const pool = mysql2.createPool(this.config)
    const query = `
    SELECT * FROM ${this.table} WHERE login = ? LIMIT 1`
    const data = await pool.query(query, [login])
    pool.end
    return data
  }

  async auth(login, password) {
    const pool = mysql2.createPool(this.config)
    const query = `
    SELECT * FROM ${this.table} WHERE login = ? AND password = ? LIMIT 1`
    const data = await pool.query(query, [login, password])
    pool.end
    return data
  }

}
module.exports = UsersDao