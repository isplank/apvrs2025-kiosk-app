import React, { useState, useEffect } from 'react';

const Screensaver = ({ onDismiss }) => {
  const [mediaType, setMediaType] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);

  useEffect(() => {
    // Public portfolio version uses the built-in fallback instead of private event media.
    const screensaverConfig = {
      type: null,
      url: null,
    };

    setMediaType(screensaverConfig.type);
    setMediaUrl(screensaverConfig.url);
  }, []);

  const renderMedia = () => {
    switch (mediaType) {
      case 'image':
        return (
          <img
            src={mediaUrl}
            alt="Screensaver"
            className="w-full h-full object-cover"
          />
        );

      case 'video':
        return (
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          >
            <source src={mediaUrl} type="video/mp4" />
          </video>
        );

      case 'pdf':
        return (
          <iframe
            src={`${mediaUrl}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
            className="w-full h-full"
            title="Screensaver PDF"
            style={{ border: 'none' }}
          />
        );

      default:
        // Fallback to default animated screensaver
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-8xl font-bold text-white drop-shadow-2xl mb-4">
              Event Banner Kiosk
            </h1>
            <p className="text-6xl text-yellow-400 animate-bounce drop-shadow-lg">
              Touch Screen to Continue
            </p>
            <div className="flex gap-8 justify-center mt-12">
              <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
              <div className="w-4 h-4 bg-white rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-4 h-4 bg-white rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-[100] flex flex-col items-center justify-center cursor-pointer"
      onClick={onDismiss}
    >
      {renderMedia()}

      {/* Touch to Continue Overlay */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 px-12 py-6 rounded-full">
        <p className="text-3xl text-white font-bold animate-pulse">
          Touch Screen to Continue
        </p>
      </div>
    </div>
  );
};

export default Screensaver;
