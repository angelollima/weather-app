/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html",],
  theme: {
    extend: {
      colors: {
        gray_bg: '#717977',
        cian_bg:'#568adf',
        r_b_color: '#6A679E',
        transparent_screen: 'rgba(255, 255, 255, 0.1)',
      },
      borderColor: {
        input_border: 'rgba(77, 40, 40, 0.158)',
      },
      boxShadow: {
        r_b_shadow: '1px 1px 1px 1px rgba(77, 40, 40, 0.212)',
        l_t_inset_shadow: 'inset 1px 1px 1px 1px rgba(77, 40, 40, 0.212)', 
        inset_shadow: 'inset -1px -1px 1px 1px rgba(77, 40, 40, 0.212), inset 1px 1px 1px 1px rgba(77, 40, 40, 0.212)',
      },
    },
  },
  plugins: [],
}
