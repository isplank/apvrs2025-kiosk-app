const { AppError } = require('../middleware/errorHandler');
const entryModel = require('../models/Entry');
const logger = require('../services/loggerService');

exports.getEntries = async (req, res, next) => {
  try {
    const { subspecialtyId, subspecialtyType, menuCode } = req.query;

    if (!subspecialtyId || !subspecialtyType) {
      throw new AppError('Missing required parameters', 400);
    }

    const entries = await entryModel.findByFilters({
      subspecialtyId,
      subspecialtyType,
      menuCode,
    });

    res.json(entries);
  } catch (error) {
    logger.error('Error in getEntries:', error);
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      throw new AppError('Invalid entry ID', 400);
    }

    const entry = await entryModel.findById(id);

    if (!entry) {
      throw new AppError('Entry not found', 404);
    }

    res.json(entry);
  } catch (error) {
    logger.error('Error in getEntryById:', error);
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const { q, orgCode } = req.query;

    if (!q || q.trim().length < 2) {
      throw new AppError('Search query must be at least 2 characters', 400);
    }

    const results = await entryModel.search(q, orgCode);
    res.json(results);
  } catch (error) {
    logger.error('Error in searchEntries:', error);
    next(error);
  }
};