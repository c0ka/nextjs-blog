// default color palette
const tailwindColors = require('tailwindcss/colors')
// addBase: register new styles in base layer like typography or @font-face
// addVariant
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media'
  plugins: [
    require('@tailwindcss/typography'), 
    require('@tailwindcss/forms'),
    // https://github.com/ecklf/tailwindcss-radix
    // variants [state/side/orientation]-* for data-[state/side/orientation]="*"
    require('tailwindcss-radix')({
      variantPrefix: false,
    }),

    plugin(({ addBase, theme}) => {
      addBase({
        'h1': { fontSize: theme( 'fontSize.3xl') },
        'h2': { fontSize: theme( 'fontSize.xl') },
        'h3': { fontSize: theme( 'fontSize.lg') },
      })
    })
  ],

  theme: {
    extend: {
      colors: {
        primary: tailwindColors.red,
        secondary: tailwindColors.blue,
        neutral: tailwindColors.neutral
      }
    }
  }
}
