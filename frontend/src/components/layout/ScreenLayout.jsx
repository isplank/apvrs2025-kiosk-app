import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { getBackgroundStyle } from '../../config/backgrounds';
import { APP_CONFIG } from '../../config/app.config';

const ScreenLayout = ({
  children,
  backgroundType,
  showHeader = true,
  showFooter = true,
  headerProps = {},
  footerProps = {},
  topPadding = APP_CONFIG.kiosk.topPadding,
  bottomPadding = APP_CONFIG.kiosk.bottomPadding
}) => {
  return (
    <div
      className="h-full flex flex-col"
      style={getBackgroundStyle(backgroundType)}
    >
      {/* Top Padding / Header Area */}
      {showHeader && (
        <div style={{ height: `${topPadding}px` }} className="flex items-start">
          <Header {...headerProps} />
        </div>
      )}

      {/* Main Content - Centered Area */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

      {/* Bottom Padding / Footer Area */}
      {showFooter && (
        <div style={{ height: `${bottomPadding}px` }} className="flex items-center">
          <Footer {...footerProps} />
        </div>
      )}
    </div>
  );
};

export default ScreenLayout;