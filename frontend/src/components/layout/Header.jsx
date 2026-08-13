import React from 'react';
import { ChevronLeft, Home } from 'lucide-react';
import Button from '../common/Button';

const Header = ({ onBack, onHome, showBack = true }) => {
  return (
    <div className="w-full px-12 py-8">
      <div className="flex gap-4">
        {showBack && onBack ? (
          <Button variant="primary" size="md" icon={ChevronLeft} onClick={onBack}>
            Back
          </Button>
        ) : (
          <div className="w-32"></div>
        )}

        {onHome && (
          <Button variant="primary" size="md" icon={Home} onClick={onHome}>
            Home
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;