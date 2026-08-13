const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');

router.get('/', entryController.getEntries);
router.get('/:id', entryController.getById);
router.get('/search', entryController.search);

module.exports = router;
