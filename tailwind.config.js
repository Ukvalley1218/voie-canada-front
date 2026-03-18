/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#1E3A8A',
          red: '#D32F2F',
        },
        secondary: {
          white: '#FFFFFF',
          gray: '#F5F5F5',
          green: '#2E7D32',
        },
        accent: {
          gold: '#FFC107',
          sky: '#64B5F6',
        },
        text: {
          dark: '#1F2937',
          muted: '#6B7280',
          light: '#9CA3AF',
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Lato', 'sans-serif'],
      },
      spacing: {
        'section': '6rem',
        'section-sm': '4rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}