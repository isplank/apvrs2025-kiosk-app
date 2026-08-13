import React, { useCallback, useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { subspecialtyService } from '../services/api/subspecialtyService';
import ScreenLayout from '../components/layout/ScreenLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { SCREENS, MESSAGES } from '../config/constants';

const SubspecialtyScreen = () => {
  const { selectedOrg, selectedMenu, onNavigate, onHome } = useAppContext();
  const [subspecialties, setSubspecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSubspecialties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await subspecialtyService.getByOrganization(selectedOrg.code);
      setSubspecialties(data);
    } catch (err) {
      setError(err.message || MESSAGES.ERROR_LOAD);
    } finally {
      setLoading(false);
    }
  }, [selectedOrg]);

  useEffect(() => {
    if (selectedOrg) loadSubspecialties();
  }, [selectedOrg, loadSubspecialties]);

  const handleSubspecialtySelect = (subspecialty) => {
    onNavigate(SCREENS.ENTRIES, { selectedSubspecialty: subspecialty });
  };

  const handleBack = () => {
    onNavigate(SCREENS.MENU, { selectedMenu: null });
  };

  return (
    <ScreenLayout
      backgroundType="category"
      headerProps={{
        onBack: handleBack,
        onHome: onHome
      }}
      footerProps={{
        text: `${selectedOrg?.name} - ${selectedMenu?.name}`
      }}
    >
      <div className="h-full flex flex-col px-14 py-12">
        {/* Title at Top */}
        <div className="pt-30 pb-12">
          <h1 className="text-5xl font-bold text-white drop-shadow-2xl text-center">
            {selectedMenu?.name}
          </h1>

        </div>

        {/* Spacer */}
        <div className="mt-12"></div>
        <div className="mt-12"></div>
        <div className="mt-12"></div>
        {/* Content */}
        <div className="flex-1 flex items-start justify-center overflow-y-auto">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} onRetry={loadSubspecialties} />
          ) : (
            <div className="grid grid-cols-2 gap-6 max-w-4xl w-full">
              {subspecialties.map((subspecialty) => (
                <button
                  key={subspecialty.id}
                  onClick={() => handleSubspecialtySelect(subspecialty)}
                  className="bg-white bg-opacity-90 text-blue-900 px-5 py-5 rounded-xl text-xl font-bold hover:bg-opacity-100 transform hover:scale-105 active:scale-95 transition-all shadow-2xl text-left leading-tight"
                >
                  {subspecialty.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </ScreenLayout>
  );
};

export default SubspecialtyScreen;
