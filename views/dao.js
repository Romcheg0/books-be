const mysql2 = require('mysql2/promise')

class Dao {
  constructor(table) {
    this.table = table
    this.config = {
      host: process.env.HOST,
      user: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      waitForConnections: true,
      connectionLimit: 20,
      queueLimit: 20
    }
  }
  async findAll() {
    const pool = mysql2.createPool(this.config)
    const data = await pool.query(`SELECT * FROM ${this.table}`)
    pool.end()
    return data
  }
  async findOne(id) {
    const pool = mysql2.createPool(this.config)
    const query = (`SELECT * FROM ${this.table} WHERE id = ?`)
    const data = await pool.query(query, [id])
    pool.end()
    return data
  }
  async create(body) {
    const pool = mysql2.createPool(this.config)
    const query = `INSERT INTO ${this.table} (?, ?, ?, ?) VALUES (?, ?, ?, ?)`
    const data = await pool.query(query, [...Object.keys(body), ...Object.values(body)])
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

  async delete(id) {
    const pool = mysql2.createPool(this.config)
    const query = `DELETE FROM ${this.table} WHERE id = ?`
    const data = await pool.query(query, [id])
    pool.end()
    return data
  }
}

module.exports = Dao