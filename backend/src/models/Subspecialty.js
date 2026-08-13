const db = require('../config/database');

class Subspecialty {
  static async findByOrganization(orgCode) {
    const table =
      orgCode === 'pao' ? 'pao_subspecialties' : 'apvrs_subspecialties';
    const query = `SELECT * FROM ${table} ORDER BY display_order`;
    const [rows] = await db.query(query);
    return rows;
  }
}

module.exports = Subspecialty;