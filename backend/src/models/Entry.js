const db = require('../config/database');

class Entry {
  static async findByFilters(filters) {
    const { subspecialtyId, subspecialtyType, menuCode } = filters;

    let query = 'SELECT * FROM entries WHERE 1=1';
    const params = [];

    if (subspecialtyId) {
      query += ' AND subspecialty_id = ? AND subspecialty_type = ?';
      params.push(subspecialtyId, subspecialtyType);
    }

    if (menuCode) {
      query += ' AND submenu_code = ?';
      params.push(menuCode);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await db.query(query, params);
    return rows;
  }

  static async findById(id) {
    const query = `
      SELECT e.*, 
             CASE 
               WHEN e.subspecialty_type = 'pao' THEN ps.name
               ELSE as.name
             END as category_name
      FROM entries e
      LEFT JOIN pao_subspecialties ps ON e.subspecialty_id = ps.id AND e.subspecialty_type = 'pao'
      LEFT JOIN apvrs_subspecialties as ON e.subspecialty_id = as.id AND e.subspecialty_type = 'apvrs'
      WHERE e.id = ?
    `;

    const [rows] = await db.query(query, [id]);
    return rows[0] || null;
  }

  static async search(searchTerm, orgCode = null) {
    let query = `
      SELECT e.*, 
             CASE 
               WHEN e.subspecialty_type = 'pao' THEN ps.name
               ELSE as.name
             END as category_name
      FROM entries e
      LEFT JOIN pao_subspecialties ps ON e.subspecialty_id = ps.id AND e.subspecialty_type = 'pao'
      LEFT JOIN apvrs_subspecialties as ON e.subspecialty_id = as.id AND e.subspecialty_type = 'apvrs'
      WHERE (
        e.submission_title LIKE ? OR
        e.remarks LIKE ? OR
        ps.name LIKE ? OR
        as.name LIKE ? OR
        CONCAT(e.submitter_first_name, ' ', e.submitter_last_name) LIKE ? OR
        CONCAT(e.first_author_first_name, ' ', e.first_author_last_name) LIKE ?
      )
    `;

    const searchPattern = `%${searchTerm}%`;
    const params = Array(6).fill(searchPattern);

    if (orgCode) {
      query += ' AND e.subspecialty_type = ?';
      params.push(orgCode);
    }

    query += ' ORDER BY e.created_at DESC LIMIT 50';

    const [rows] = await db.query(query, params);
    return rows;
  }
}

module.exports = Entry;