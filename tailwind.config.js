const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  presets: [require('tailwindcss/defaultConfig')],
  purge: ['node_modules/@coideo/barrani/build/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
    animationDelay: {
      200: 'animation-delay: 0.2s',
    },
    extend: {
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
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      cursor: ['disabled'],
      opacity: ['disabled'],
      textColor: ['active', 'disabled'],
    },
    animation: ({ after }) => after(['motion-safe', 'motion-reduce']),
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
};
