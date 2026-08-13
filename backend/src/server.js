const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./config/database');
const { errorHandler } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');
const sanitizeInput = require('./middleware/sanitizer');
const logger = require('./services/loggerService');

// Import routes
const organizationRoutes = require('./routes/organizations');
const menuRoutes = require('./routes/menus');
const subspecialtyRoutes = require('./routes/subspecialties');
const entryRoutes = require('./routes/entries');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Apply rate limiting and sanitization
app.use('/api', apiLimiter);
app.use(sanitizeInput);

// Routes
app.get('/api/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'ok', message: 'Server and database are running' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.use('/api/organizations', organizationRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/subspecialties', subspecialtyRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/search', entryRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`
╔════════════════════════════════════════════════════════════╗
║          Event Kiosk Backend Server Started                ║
╠════════════════════════════════════════════════════════════╣
║  Local:   http://localhost:${PORT}                          
║  Network: http://YOUR_IP_ADDRESS:${PORT}                    
║                                                            ║
║  Database: MySQL (${process.env.DB_NAME})                  
║  Environment: ${process.env.NODE_ENV}                      
╚════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  await db.end();
  process.exit(0);
});

module.exports = app;