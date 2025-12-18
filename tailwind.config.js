/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.02em' }],
        'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.03em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.03em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.04em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.05em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.05em' }],
      },
      colors: {
        'gs-red': '#DC143C',
        'gs-yellow': '#FFD700',
        'gs-dark-red': '#8B0000',
        'gs-dark-blue': '#1e3a8a',
      },
      boxShadow: {
        'sport': '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(220, 20, 60, 0.1)',
        'sport-lg': '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(220, 20, 60, 0.2)',
        'glow': '0 0 20px rgba(255, 215, 0, 0.5)',
        'glow-red': '0 0 30px rgba(220, 20, 60, 0.6)',
      },
    },
  },
  plugins: [],
}
