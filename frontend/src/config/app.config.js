export const APP_CONFIG = {
  kiosk: {
    idleTimeout: parseInt(process.env.REACT_APP_IDLE_TIMEOUT) || 300000,
    width: parseInt(process.env.REACT_APP_KIOSK_WIDTH) || 1080,
    height: parseInt(process.env.REACT_APP_KIOSK_HEIGHT) || 1920,
    topPadding: 420,      // Updated to 420px
    bottomPadding:420,   // Updated to 420px
  },
  features: {
    enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
    enableDebug: process.env.REACT_APP_ENABLE_DEBUG === 'true',
  },
  search: {
    minLength: 2,
    maxResults: 50,
    debounceMs: 300,
  },
};