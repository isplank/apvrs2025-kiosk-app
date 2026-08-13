const { AppError } = require('../middleware/errorHandler');
const subspecialtyModel = require('../models/Subspecialty');
const logger = require('../services/loggerService');

exports.getByOrganization = async (req, res, next) => {
  try {
    const { orgCode } = req.params;

    if (!orgCode) {
      throw new AppError('Organization code is required', 400);
    }

    const subspecialties = await subspecialtyModel.findByOrganization(orgCode);
    res.json(subspecialties);
  } catch (error) {
    logger.error('Error in getByOrganization:', error);
    next(error);
  }
};