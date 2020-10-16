const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  presets: [require('tailwindcss/defaultConfig')],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: [
    'node_modules/@getcrowder/barrani/lib/defaultTheme.js',
    'node_modules/@getcrowder/barrani/dist/index.js',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
    cursor: ['responsive', 'disabled'],
    opacity: ['responsive', 'group-hover', 'hover', 'focus', 'disabled'],
  },
  plugins: [require('@tailwindcss/ui'), require('@tailwindcss/custom-forms')],
};
