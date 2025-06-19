/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // NotebookLM exact color scheme
        primary: {
          blue: '#4285f4',
          chat: '#1976d2',
          dark: '#1565c0'
        },
        background: {
          primary: '#0f0f23',
          secondary: '#1a1a2e',
          surface: '#2d2d44'
        },
        text: {
          primary: '#ffffff',
          secondary: '#9e9e9e',
          muted: '#666666'
        },
        accent: {
          green: '#34a853',
          orange: '#ff9800',
          red: '#f44336'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      borderRadius: {
        'chat': '18px',
        'button': '24px',
      },
      animation: {
        'waveform-pulse': 'waveform-pulse 1s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        'waveform-pulse': {
          '0%': { opacity: '0.7' },
          '100%': { opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}