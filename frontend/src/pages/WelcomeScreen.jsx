import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { organizationService } from '../services/api/organizationService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { SCREENS, MESSAGES } from '../config/constants';
import { getBackgroundStyle } from '../config/backgrounds';

const WelcomeScreen = () => {
  const { onNavigate } = useAppContext();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOrganizations, setShowOrganizations] = useState(false);

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await organizationService.getAll();
      setOrganizations(data);
    } catch (err) {
      setError(err.message || MESSAGES.ERROR_CONNECTION);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrganizations();
  }, []);

  const handleTouchToStart = () => {
    setShowOrganizations(true);
  };

  const handleOrgSelect = (org) => {
    onNavigate(SCREENS.MENU, { selectedOrg: org });
  };

  // Touch to Start Screen
  if (!showOrganizations) {
    return (
      <div
        className="h-full flex flex-col items-center justify-center cursor-pointer"
        style={getBackgroundStyle('welcome')}
        onClick={handleTouchToStart}
      >
        <div className="text-center space-y-8 animate-fade-in px-10">
          <h1 className="text-7xl font-bold text-white drop-shadow-2xl mb-8">
            Event Kiosk Platform
          </h1>
          <p className="text-6xl text-blue-100 animate-bounce drop-shadow-lg">
            Touch Screen to Start
          </p>
          <div className="flex gap-8 justify-center mt-12">
            <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
            <div className="w-4 h-4 bg-white rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-4 h-4 bg-white rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Organization Selection Screen
  return (
    <div
      className="h-full flex flex-col items-center justify-center p-12"
      style={getBackgroundStyle('menu')}
    >
      <div className="text-center mb-16 animate-fade-in">
        {/* <h1 className="text-7xl font-bold text-white mb-6 drop-shadow-2xl">
          Welcome to
        </h1>
        <h2 className="text-6xl font-bold text-yellow-400 mb-4 drop-shadow-2xl">
          Event Banner Kiosk
        </h2> */}
        <p className="text-3xl text-white mt-8 drop-shadow-lg">
          Select an organization to begin
        </p>
      </div>

      {loading ? (
        <LoadingSpinner size="lg" />
      ) : error ? (
        <ErrorMessage message={error} onRetry={loadOrganizations} />
      ) : (
        <div className="flex flex-row gap-10 w-full px-16 max-w-4xl"
        style={{
        paddingBottom: '550px'
      }}
        >
          {organizations.map((org) => (
            <button
              key={org.id}
              onClick={() => handleOrgSelect(org)}
              className="bg-white bg-opacity-95 text-blue-900 px-20 py-16 rounded-3xl text-5xl font-bold hover:bg-blue-50 transform hover:scale-105 active:scale-95 transition-all shadow-2xl w-full"
            >
              {org.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
