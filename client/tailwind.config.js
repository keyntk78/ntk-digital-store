/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js, jsx, ts, tsx}', './public/index.html'],
  theme: {
    fontFamily: {
      main: ['Poppins', 'sans-serif'],
      main_admin: ['Nunito Sans', 'sans-serif']
    },
    extend: {
      width: {
        main: '1220px'
      },
      backgroundColor: {
        main: '#5d87ff',
        main_admin: '#F5F6FA',
        secondary_admin: '#5d87ff',
        primary: '#5d87ff',
        secondary: '#49beff',
        success: '#13deb9',
        danger: '#fa896b',
        warning: '#ffae1f',
        light: '#e9eaeb',
        dark: '#202224',
        primary_hover: '#4570ea',
        secondary_hover: '#23afdb',
        success_hover: '#02b3a9',
        danger_hover: '#f3704d',
        warning_hover: '#ae8e59'
      },
      colors: {
        main: '#5d87ff',
        main_admin: '#5d87ff',
        black_admin: '#202224',
        primary: '#5d87ff',
        secondary: '#49beff',
        success: '#13deb9',
        danger: '#fa896b',
        warning: '#ffae1f',
        light: '#e9eaeb',
        dark: '#202224'
      },

      keyframes: {
        'slide-top': {
          '0% ': {
            '-webkit-transform': 'translateY(40px)',
            transform: 'translateY(20px)'
          },
          '100%': {
            '-webkit-transform': 'translateY(0)',
            transform: 'translateY(0)'
          }
        },
        'slide-top-sm': {
          '0% ': {
            '-webkit-transform': 'translateY(8px)',
            transform: 'translateY(8px)'
          },
          '100%': {
            '-webkit-transform': 'translateY(-2px)',
            transform: 'translateY(0)'
          }
        },
        'slide-bottom': {
          '0% ': {
            '-webkit-transform': 'translateY(0)',
            transform: 'translateY(0)'
          },
          '100%': {
            '-webkit-transform': 'translateY(40px)',
            transform: 'translateY(40px)'
          }
        },
        'scale-up-hor-left': {
          '0%': {
            '-webkit-transform': 'scaleX(0.8)',
            transform: 'scaleX(1)',
            '-webkit-transform-origin': '0% 0%',
            'transform-origin': '0% 0% '
          },
          '100%': {
            '-webkit-transform': 'scaleX(1)',
            transform: ' scaleX(1)',
            '-webkit-transform-origin': ' 0% 0%',
            'transform-origin': '0% 0%'
          }
        }
      },
      animation: {
        'slide-top':
          'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-bottom':
          'slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-top-sm': 'slide-top-sm 0.2s linear both',
        'scale-up-hor-left':
          'scale-up-hor-left 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'
      }
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 1024px) { ... }

      lg: '1024px',

      xl: '1280px'
      // => @media (min-width: 1280px) { ... }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
