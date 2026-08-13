const db = require('../config/database');

class Organization {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM organizations ORDER BY name');
    return rows;
  }

  static async findByCode(code) {
    const [rows] = await db.query('SELECT * FROM organizations WHERE code = ?', [
      code,
    ]);
    return rows[0] || null;
  }
}

module.exports = Organization;