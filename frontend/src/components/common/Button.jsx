import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'font-bold rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg';

  const variants = {
    primary: 'bg-white text-blue-900 hover:bg-blue-50',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizes = {
    sm: 'px-6 py-3 text-lg',
    md: 'px-8 py-5 text-xl',
    lg: 'px-12 py-8 text-2xl',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'lg' ? 32 : size === 'md' ? 28 : 24} />}
      {children}
    </button>
  );
};

export default Button;