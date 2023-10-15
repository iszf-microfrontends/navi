module.exports = {
  root: true,
  extends: ['@iszf-microfrontends/eslint-config'],
  plugins: ['react-refresh'],
  ignorePatterns: ['dist', 'webpack.config.js', '.eslintrc.js'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
