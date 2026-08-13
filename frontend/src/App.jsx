import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { useIdleTimer } from './hooks/useIdleTimer';
import PortraitContainer from './components/layout/PortraitContainer';
import Screensaver from './components/kiosk/Screensaver';
import WelcomeScreen from './pages/WelcomeScreen';
import MenuScreen from './pages/MenuScreen';
import SubspecialtyScreen from './pages/SubspecialtyScreen';
import EntriesScreen from './pages/EntriesScreen';

function App() {
  const [screen, setScreen] = useState('welcome');
  const [appData, setAppData] = useState({
    selectedOrg: null,
    selectedMenu: null,
    selectedSubspecialty: null,
  });

  const handleNavigate = (newScreen, data = {}) => {
    setScreen(newScreen);
    setAppData(prev => ({ ...prev, ...data }));
  };

  const handleHome = () => {
    setScreen('welcome');
    setAppData({
      selectedOrg: null,
      selectedMenu: null,
      selectedSubspecialty: null,
    });
  };

  const { isIdle, setIsIdle, setCurrentScreen } = useIdleTimer(
    handleHome,
    ['welcome']
  );

  useEffect(() => {
    setCurrentScreen(screen);
  }, [screen, setCurrentScreen]);

  if (isIdle) {
    return (
      <PortraitContainer>
        <Screensaver onDismiss={() => setIsIdle(false)} />
      </PortraitContainer>
    );
  }

  return (
    <AppProvider value={{ ...appData, onNavigate: handleNavigate, onHome: handleHome }}>
      <PortraitContainer>
        {screen === 'welcome' && <WelcomeScreen />}
        {screen === 'menu' && <MenuScreen />}
        {screen === 'subspecialties' && <SubspecialtyScreen />}
        {screen === 'entries' && <EntriesScreen />}
      </PortraitContainer>
    </AppProvider>
  );
}

export default App;