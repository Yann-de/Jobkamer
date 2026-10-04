/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef5fc',
          100: '#d5e6f8',
          200: '#b0d1f3',
          300: '#7cb2eb',
          400: '#4a8fde',
          500: '#1a6bcc', // Official Primary
          600: '#1557a6',
          700: '#124b91',
          800: '#103f7a',
          900: '#0e3564',
          DEFAULT: '#1a6bcc',
        },
        secondary: {
          50: '#eef9f2',
          100: '#daf1e2',
          200: '#b6e3c6',
          300: '#84cfa1',
          400: '#48c77f',
          500: '#27ae60', // Official Secondary
          600: '#1e8e4e',
          700: '#1e8449',
          800: '#196439',
          900: '#155230',
          DEFAULT: '#27ae60',
        },
        background: {
          light: '#F5F7FA',
          dark: '#1A1A2E',
          DEFAULT: '#F5F7FA',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#24243E',
          DEFAULT: '#FFFFFF',
        },
        text: {
          primary: '#2C2C2C',
          secondary: '#7F8C8D',
          disabled: '#BDC3C7',
          dark: '#F5F7FA',
        },
        error: {
          DEFAULT: '#E74C3C',
          light: '#FDEDEC',
          dark: '#FF6B6B',
        },
        warning: {
          DEFAULT: '#F39C12',
          light: '#FEF9E7',
          dark: '#F5A623',
        },
        success: {
          DEFAULT: '#27AE60',
          light: '#E9F7EF',
          dark: '#2ECC71',
        },
        cameroon: {
          green: '#007A5E',
          red: '#CE1126',
          yellow: '#FCD116',
        },
      },
    },
  },
  plugins: [],
};
