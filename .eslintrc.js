module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'prettier/react',
  ],
  plugins: ['jest', 'react', 'react-hooks'],
  env: {
    node: true,
  },
};
