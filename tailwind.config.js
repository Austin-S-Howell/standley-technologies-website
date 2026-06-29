import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        // Sage — primary UI green (muted grey-green)
        sage: {
          50: '#F2F5F3',
          100: '#E2EAE5',
          200: '#C7D6CC',
          300: '#A8BEAF',
          400: '#90AA98',
          500: '#7C9885',
          600: '#5F7E6B',
          700: '#4A6555',
          800: '#374D41',
          900: '#26352D',
        },
        // Summit — deep green / depth (logo-adjacent forest, used sparingly)
        summit: {
          500: '#3C7E5D',
          600: '#327052',
          700: '#2F6B4F',
          800: '#1F4D38',
          900: '#163A2B',
          950: '#0E261C',
        },
        // Gold — premium accent
        gold: {
          50: '#FAF6EA',
          100: '#F3EACF',
          200: '#E7D6A3',
          300: '#DBC079',
          400: '#D0B25E',
          500: '#C9A84C',
          600: '#BFA14A',
          700: '#9E8439',
          800: '#7C672C',
          900: '#5A4A20',
        },
        // Neutral / grey (slate-tinted, cool, modern)
        neutral: {
          0: '#FFFFFF',
          50: '#F7F8F8',
          100: '#EEF0F1',
          200: '#E0E3E5',
          300: '#C8CDD0',
          400: '#9AA1A6',
          500: '#6E767C',
          600: '#545C62',
          700: '#3D444A',
          800: '#272D32',
          900: '#161A1D',
        },
        success: { 50: '#E8F4EE', 500: '#3E9E6E', 700: '#1F7A4D' },
        error: { 50: '#F8E9E8', 500: '#C2453E' },
        warning: { 500: '#D99A2B', 700: '#8A6310' },
        info: { 500: '#3B7BA8' },
      },
      fontFamily: {
        sans: ['Inter Variable', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk Variable', 'Inter Variable', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(22, 26, 29, 0.04), 0 8px 24px rgba(22, 26, 29, 0.06)',
        'card-hover': '0 2px 4px rgba(22, 26, 29, 0.06), 0 16px 40px rgba(22, 26, 29, 0.10)',
      },
      transitionTimingFunction: {
        summit: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        driftA: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0) scale(1)' },
          '50%': { transform: 'translateX(-50%) translateY(-16px) scale(1.07)' },
        },
        driftB: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(22px, 12px) scale(1.1)' },
        },
        driftC: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-18px, -12px) scale(1.06)' },
        },
      },
      animation: {
        'drift-a': 'driftA 9s ease-in-out infinite',
        'drift-b': 'driftB 13s ease-in-out infinite',
        'drift-c': 'driftC 11s ease-in-out infinite',
      },
    },
  },
  plugins: [forms, typography],
}
