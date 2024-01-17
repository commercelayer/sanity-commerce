module.exports = {
  '**/*.{js}': ['eslint --fix'],
  '**/*.{ts}': ['eslint --fix', () => 'tsc --build'],
  '*.{js,ts,tsx,json,md,css}': ['prettier --write'],
};
