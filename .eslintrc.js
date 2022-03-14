module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb',
    'airbnb/hooks',
    'prettier',
  ],
  plugins: ['jest', 'react', 'react-hooks'],
  env: {
    node: true,
  },
  rules: {
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/forbid-prop-types': ['off'],
    // TODO: fix
    'default-param-last': ['off'],
    // TODO: fix
    'testing-library/no-node-access': ['off'],
  },
};
