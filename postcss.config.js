// const postcssPresetEnv = require('postcss-preset-env');

// module.exports = {
//   plugins: [
//     require('postcss-flexbugs-fixes'),
//     require('tailwindcss'),
//     postcssPresetEnv({
//       autoprefixer: { flexbox: 'no-2009' },
//       stage: 3,
//       features: { 'custom-properties': false },
//     }),
//   ],
// };

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
