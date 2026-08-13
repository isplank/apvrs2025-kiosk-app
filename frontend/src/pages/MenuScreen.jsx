import React, { useCallback, useEffect, useState } from 'react';
import { FileText, Video } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { menuService } from '../services/api/menuService';
import ScreenLayout from '../components/layout/ScreenLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { SCREENS, MESSAGES } from '../config/constants';

const MenuScreen = () => {
  const { selectedOrg, onNavigate, onHome } = useAppContext();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMenus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await menuService.getByOrganization(selectedOrg.code);
      setMenus(data);
    } catch (err) {
      setError(err.message || MESSAGES.ERROR_LOAD);
    } finally {
      setLoading(false);
    }
  }, [selectedOrg]);

  useEffect(() => {
    if (selectedOrg) loadMenus();
  }, [selectedOrg, loadMenus]);

  const handleMenuSelect = (menu) => {
    onNavigate(SCREENS.SUBSPECIALTIES, { selectedMenu: menu });
  };

  const handleBack = () => {
    onNavigate(SCREENS.WELCOME, { selectedOrg: null });
  };

  return (
    <ScreenLayout
      backgroundType="category"
      headerProps={{
        onBack: handleBack,
        onHome: onHome
      }}
      footerProps={{
        text: `${selectedOrg?.name} - Menu Selection`
      }}
    >
      <div className="h-full flex flex-col px-8 py-12">
        {/* Title at Top */}
        <div className="pt-30 pb-12">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl text-center">
            {selectedOrg?.name}
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
            <ErrorMessage message={error} onRetry={loadMenus} />
          ) : (
            <div className="grid grid-cols-2 gap-8 max-w-3xl w-full">
              {menus.map((menu) => (
                <button
                  key={menu.id}
                  onClick={() => handleMenuSelect(menu)}
                  className="bg-white bg-opacity-90 text-blue-900 px-2 py-2 rounded-3xl text-3xl font-bold hover:bg-opacity-100 transform hover:scale-105 active:scale-95 transition-all shadow-2xl flex flex-col items-center justify-center gap-4"
                >
                  {menu.name.includes('Video') ? <Video size={64} /> : <FileText size={64} />}
                  {menu.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </ScreenLayout>
  );
};

export default MenuScreen;
