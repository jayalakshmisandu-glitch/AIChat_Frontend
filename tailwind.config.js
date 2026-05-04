export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        glass: 'rgba(255, 255, 255, 0.8)',
      },
      boxShadow: {
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'glow': '0 0 0 1px rgba(59, 130, 246, 0.5), 0 25px 50px -12px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        xs: '4px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'lift': 'lift 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-2px)' },
        },
      },
    },
  },
  plugins: [],
}
