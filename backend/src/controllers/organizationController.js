const { AppError } = require('../middleware/errorHandler');
const organizationModel = require('../models/Organization');
const menuModel = require('../models/Menu');
const logger = require('../services/loggerService');

exports.getAll = async (req, res, next) => {
  try {
    const organizations = await organizationModel.findAll();
    res.json(organizations);
  } catch (error) {
    logger.error('Error in getAll organizations:', error);
    next(error);
  }
};

exports.getMenus = async (req, res, next) => {
  try {
    const { code } = req.params;
    const menus = await menuModel.findByOrganization(code);
    res.json(menus);
  } catch (error) {
    logger.error('Error in getMenus:', error);
    next(error);
  }
};