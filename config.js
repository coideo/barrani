const deepMerge = await import('deepmerge');
const { fontFamily } = await import('tailwindcss/defaultTheme');

const config = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
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

function arrayMergeFn(destinationArray, sourceArray) {
  return destinationArray.concat(sourceArray).reduce((acc, cur) => {
    if (acc.includes(cur)) return acc;
    return [...acc, cur];
  }, []);
}

function wrapper(tailwindConfig) {
  return deepMerge(tailwindConfig, config, { arrayMerge: arrayMergeFn });
}

module.exports = wrapper;
