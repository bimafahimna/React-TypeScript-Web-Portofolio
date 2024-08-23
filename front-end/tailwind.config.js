/** @type {import('tailwindcss').Config} */
const defualtTheme = require('tailwindcss/defaultTheme');

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['"Roboto Slab"', 'sans-serif'],
			},
			// earthy color palette
			colors: {
				'light-black': '#223030',
				brown: '#523D35',
				'green-grey': '#959D90',
				beige: '#BBA58F',
				'light-beige': '#E8D9CD',
				'off-white': '#EFEFE9',
			},
		},
	},
	plugins: [],
};
