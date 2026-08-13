const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');

router.get('/', organizationController.getAll);
router.get('/:code/menus', organizationController.getMenus);

module.exports = router;