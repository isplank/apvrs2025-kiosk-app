const express = require('express');
const router = express.Router();
const subspecialtyController = require('../controllers/subspecialtyController');

router.get('/:orgCode', subspecialtyController.getByOrganization);

module.exports = router;