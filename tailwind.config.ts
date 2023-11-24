import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          600: '#58585b'
        },

        blue: {
          600: '#2e68b1'
        },

        red: {
          100: '#fdd8d5',
          500: '#880c03'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
export default config
