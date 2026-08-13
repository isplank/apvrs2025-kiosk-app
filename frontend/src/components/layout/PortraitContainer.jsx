import React from 'react';
import { APP_CONFIG } from '../../config/app.config';

const PortraitContainer = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center">
      <div
        className="overflow-hidden bg-white relative"
        style={{
          width: `${APP_CONFIG.kiosk.width}px`,
          height: `${APP_CONFIG.kiosk.height}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PortraitContainer;