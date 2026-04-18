/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				syne: ['Syne', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
			},
			colors: {
				surface: {
					DEFAULT: '#0a0a0a',
					light: '#141414',
					lighter: '#1e1e1e',
				},
				accent: {
					DEFAULT: '#BBA58F',
					muted: '#959D90',
					warm: '#E8D9CD',
				},
				text: {
					DEFAULT: '#EFEFE9',
					muted: '#8a8a80',
					dark: '#223030',
				},
			},
			fontSize: {
				display: ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', fontWeight: '700' }],
				headline: ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', fontWeight: '700' }],
				subhead: ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.4', fontWeight: '400' }],
			},
			borderRadius: {
				pill: '9999px',
			},
		},
	},
	plugins: [],
};
