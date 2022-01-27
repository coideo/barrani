const { fontFamily, colors } = require('tailwindcss/defaultTheme');

module.exports = {
  presets: [require('tailwindcss/defaultConfig')],
  content: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/utils/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: { center: true },
    extend: {
      colors: {
        current: 'currentColor',
        primary: colors.indigo,
      },
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
      animation: {
        blink: 'blink 1.4s infinite both',
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        wiggle: 'wiggle 1s infinite',
      },
      keyframes: {
        blink: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0.2' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'scale(1.2) rotate(7deg)' },
          '50%': { transform: 'scale(0.8) rotate(-7deg)' },
        },
      },
    },
  },
  plugins: [],
};
