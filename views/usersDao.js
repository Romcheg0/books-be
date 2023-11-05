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
      ) VALUES (?, ?, ?, ?)`
    const data = await pool.query(query, [...Object.values(body)])
    pool.end()
    return data
  }
  async update(id, body) {
    const pool = mysql2.createPool(this.config)

    const keys = Object.keys(body);
    const values = Object.values(body);
    const sets = keys.map(key => `${key} = ?`).join(', ');
    const query = `UPDATE ${this.table} SET ${sets} WHERE id = ?`;

    const data = await pool.query(query, [...values, id]);
    pool.end()
    return data
  }
}
module.exports = UsersDao