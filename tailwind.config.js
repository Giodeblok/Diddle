/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F1E8',
        beige: '#E8D8C3',
        gold: '#D6B98C',
        'gold-deep': '#C9A86A',
        taupe: '#A68B6B',
        anthracite: '#232323',
        brown: '#6F5845',
        ivory: '#FFFDF8',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D6B98C 0%, #C9A86A 50%, #A68B6B 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FFFDF8 0%, #F7F1E8 100%)',
        'hero-gradient': 'linear-gradient(160deg, #FFFDF8 0%, #F7F1E8 40%, #E8D8C3 100%)',
      },
      boxShadow: {
        'luxury': '0 4px 40px rgba(166, 139, 107, 0.15)',
        'luxury-lg': '0 8px 60px rgba(166, 139, 107, 0.2)',
        'gold': '0 4px 20px rgba(201, 168, 106, 0.3)',
        'soft': '0 2px 20px rgba(35, 35, 35, 0.06)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
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
      },
    },
  },
  plugins: [],
}

