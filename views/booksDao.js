const mysql2 = require('mysql2/promise')
const Dao = require('./dao')
class BooksDao extends Dao {
  constructor() {
    super('books')
  }
  async create(body) {
    const pool = mysql2.createPool(this.config)
    const query = `
    INSERT INTO ${this.table} 
      (
        ${Object.keys(body).join(', ')}
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const data = await pool.query(query, [...Object.values(body)])
    pool.end()
    return data
  }
  async update(id, body) {
    const pool = mysql2.createPool(this.config)

    const keys = Object.keys(body);
    const values = Object.values(body);
    if (keys.length !== 9 || values.length !== 9) {
      throw new Error("invalid count of columns")
    }
    const sets = keys.map(key => `${key} = ?`).join(', ');
    const query = `UPDATE ${this.table} SET ${sets} WHERE id = ?`;

    const data = await pool.query(query, [...values, id]);
    pool.end()
    return data
  }
  async findByAuthor(id) {
    const pool = mysql2.createPool(this.config)
    const query = `SELECT * FROM ${this.table} WHERE author_id = ?`
    const data = await pool.query(query, [id])
    pool.end()
    return data
  }
  async findByGenre(genre) {
    const pool = mysql2.createPool(this.config)
    const query = `SELECT * FROM ${this.table} WHERE genre = ?`
    const data = await pool.query(query, [genre])
    pool.end()
    return data
  }
  async findByPublisher(publisher) {
    const pool = mysql2.createPool(this.config)
    const query = `SELECT * FROM ${this.table} WHERE publisher = ?`
    const data = await pool.query(query, [publisher])
    pool.end()
    return data
  }
  async findOneJoined(id) {
    const pool = mysql2.createPool(this.config)
    const query = `SELECT * FROM ${this.table} LEFT JOIN users ON ${this.table}.author_id = users.id WHERE ${this.table}.id = ?`
    const data = await pool.query(query, [id])
    pool.end()
    return data
  }
}
module.exports = BooksDao