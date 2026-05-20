/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: '#EDE9FE',
        'pink-light': '#FDF2F8',
        lilac: '#C084FC',
        'lilac-deep': '#A855F7',
        violet: '#7C3AED',
        plum: '#6B21A8',
        mint: '#6EE7B7',
        anthracite: '#232323',
        'off-white': '#FAFAF9',
      },
      fontFamily: {
        serif: ['"Nunito"', '"Poppins"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'lilac-gradient': 'linear-gradient(135deg, #C084FC 0%, #A855F7 50%, #7C3AED 100%)',
        'lavender-gradient': 'linear-gradient(180deg, #FAFAF9 0%, #EDE9FE 100%)',
        'hero-gradient': 'linear-gradient(160deg, #FAFAF9 0%, #EDE9FE 40%, #FDF2F8 100%)',
      },
      boxShadow: {
        'luxury': '0 4px 40px rgba(168, 85, 247, 0.12)',
        'luxury-lg': '0 8px 60px rgba(168, 85, 247, 0.18)',
        'lilac': '0 4px 20px rgba(192, 132, 252, 0.3)',
        'soft': '0 2px 20px rgba(35, 35, 35, 0.06)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-8px) scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}

