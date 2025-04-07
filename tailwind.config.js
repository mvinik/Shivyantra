/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Ensure this is correct
  theme: {
    extend: {
      colors: {
        red: '#094680',
        yellow: '#ffffff',
        white: '#FFFFFF',
        // black: '#560000',
        black:'#292929',
        green: '#399918',
        liteYellow:'#fceecf',
         amber:'#391818',
         orange:'#A0650E',
        //  gray:'#4a4a4a'
           gray:'#BEBEBE'
      },
      backgroundImage:{
        'Pattern':"url('/public/Assests/homeBg.jpg')",
      },
      fontFamily: {
        Arvo: ['Arvo', 'serif'],
        Serif: ['serif'],
      },
      animation: {
          marquee: 'marquee 15s linear infinite',
          marquee2: 'marquee2 15s linear infinite',
          'spin-slow': 'spin 5s  linear infinite',
          'spin-fast': 'spin 500ms linear infinite',
          'spin-custom': 'spin 7s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1200px',
      xxl: '1600px',
    },
    

  },
  plugins: [],
};
