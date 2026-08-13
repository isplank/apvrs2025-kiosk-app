import React from 'react';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div
        className={`${sizes[size]} border-8 border-white border-t-transparent rounded-full animate-spin mb-4`}
      ></div>
      <p className="text-white text-2xl">{message}</p>
    </div>
  );
};

export default LoadingSpinner;