const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.js'],
  darkMode: 'media',
  theme: {
    extend: {
      groups: ['1', '2'],
    },
  },
  plugins: [
    plugin(({ addVariant, theme }) => {
      const groups = theme('groups') || []

      Object.values(groups).forEach(group => {
        addVariant(`group-${group}-hover`, () => {
          return `:merge(.group-${group}):hover &`
        })
      })
    }),
  ],
}
