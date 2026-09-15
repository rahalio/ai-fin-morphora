import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#E6EAF2',
        chalk: '#F1F5F9',
        breach: '#F43F5E',
        indigo: {
          950: '#0A0E1A',
          900: '#12182A',
        },
        signal: '#E8B931',
        steel: '#7B8794',
        teal: '#2DD4BF',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        mono: [
          'var(--font-ibm-plex-mono)',
          'IBM Plex Mono',
          'ui-monospace',
          'monospace',
        ],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
      },
      transitionDuration: {
        stamp: '180ms',
        rail: '220ms',
        kill: '200ms',
      },
    },
  },
  plugins: [],
};

export default config;
