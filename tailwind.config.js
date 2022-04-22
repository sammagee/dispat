const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.js'],
  darkMode: 'media',
  theme: {
    extend: {
      groups: ['1', '2'],
      backgroundImage: {
        'gradient-radial-to-b':
          'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
        'gradient-radial-to-t':
          'radial-gradient(ellipse at bottom, var(--tw-gradient-stops))',
        'gradient-radial-to-r':
          'radial-gradient(ellipse at left, var(--tw-gradient-stops))',
        'gradient-radial-to-l':
          'radial-gradient(ellipse at right, var(--tw-gradient-stops))',
      },
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
