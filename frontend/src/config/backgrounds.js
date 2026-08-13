export const BACKGROUNDS = {
  welcome: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 45%, #0f766e 100%)',
  menu: 'linear-gradient(135deg, #111827 0%, #2563eb 52%, #f59e0b 100%)',
  subspecialties: 'linear-gradient(135deg, #0f172a 0%, #0f766e 55%, #2563eb 100%)',
  category: 'linear-gradient(135deg, #0f172a 0%, #0f766e 55%, #2563eb 100%)',
  entries: 'linear-gradient(135deg, #111827 0%, #1f2937 45%, #1d4ed8 100%)',
};

export const getBackgroundStyle = (backgroundType) => {
  const background = BACKGROUNDS[backgroundType] || BACKGROUNDS.welcome;

  return {
    background,
  };
};
