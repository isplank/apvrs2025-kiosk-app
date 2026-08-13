import React from 'react';

const Footer = ({ text, showLogo = false }) => {
  return (
    <div className="w-full px-8">
      <div className="flex justify-center items-center">
        <div className="text-center">
          {showLogo && <div className="mb-4 text-white text-2xl font-bold">Event Kiosk</div>}
          <p className="text-white text-xl drop-shadow-lg">
            {text || ''}
          </p>
          <p className="text-blue-200 text-sm mt-2">
            {/* © 2024 All Rights Reserved */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
