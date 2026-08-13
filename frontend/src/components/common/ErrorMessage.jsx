import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="bg-red-600 text-white px-12 py-8 rounded-3xl text-2xl mb-8 shadow-2xl max-w-2xl text-center">
        {message}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-white text-blue-900 px-12 py-6 rounded-2xl text-xl font-bold hover:bg-blue-50 active:scale-95 transition-all shadow-lg"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;