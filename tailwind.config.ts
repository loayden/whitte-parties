import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx,js,jsx}', './components/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0B0A08',
        tent: '#1C1812',
        gold: '#D9A05B',
        amber: '#FFC15E',
        linen: '#F8F3E8',
        oxblood: '#7A2B2B',
        zellige: '#2C7A74'
      },
      borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        pill: '9999px'
      },
      boxShadow: {
        depth: '0 20px 60px rgba(0,0,0,0.45)',
        glow: '0 0 24px rgba(255,193,94,0.25)'
      },
      transitionTimingFunction: {
        'fabric-in': 'cubic-bezier(0.22,1,0.36,1)',
        'fabric-out': 'cubic-bezier(0.65,0,0.35,1)'
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        accent: ['Reem Kufi', 'sans-serif'],
        body: ['Geist', 'Inter', 'sans-serif'],
        data: ['Space Mono', 'monospace']
      }
    }
  },
  plugins: []
}

export default config
