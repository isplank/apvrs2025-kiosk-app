const db = require('../config/database');

class Menu {
  static async findByOrganization(orgCode) {
    const query = `
      SELECT m.* FROM menus m
      JOIN organizations o ON m.organization_id = o.id
      WHERE o.code = ?
      ORDER BY m.display_order
    `;
    const [rows] = await db.query(query, [orgCode]);
    return rows;
  }
}

module.exports = Menu;