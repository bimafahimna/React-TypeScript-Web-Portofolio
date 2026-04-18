/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				// Single typeface, used throughout — minimalism = restraint.
				// Both keys resolve to Inter so existing components keep working.
				syne: ['Inter', 'system-ui', 'sans-serif'],
				inter: ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				// Light, airy base — barely-there tint of the chartreuse so the page
				// feels like sun on a tide pool rather than clinical white.
				surface: {
					DEFAULT: '#f8faf0', // pale cream (hint of #D2E69C)
					light: '#ffffff',   // pure paper
					lighter: '#eef3da', // chartreuse-tinted card surface
				},
				// Coastal accent family — teal leads, mint + chartreuse support.
				accent: {
					DEFAULT: '#28B5B5', // vibrant teal — primary signature color
					muted: '#8FD9A8',   // mint — used for soft tints / blobs
					warm: '#D2E69C',    // pale chartreuse — hover / sun-on-water lift
				},
				text: {
					DEFAULT: '#1f3a4a', // deepened slate-teal (derived from #4B778D for legibility)
					muted: '#4B778D',   // the palette's slate-teal as soft secondary text
					dark: '#0a2533',    // deep slate — text on bright teal buttons (passes AA)
				},
			},
			fontSize: {
				display: ['clamp(2.75rem, 7vw, 6rem)', { lineHeight: '1.05', fontWeight: '600', letterSpacing: '-0.03em' }],
				headline: ['clamp(1.875rem, 3.5vw, 3rem)', { lineHeight: '1.15', fontWeight: '600', letterSpacing: '-0.02em' }],
				subhead: ['clamp(1rem, 1.5vw, 1.25rem)', { lineHeight: '1.5', fontWeight: '400' }],
			},
			borderRadius: {
				pill: '9999px',
			},
		},
	},
	plugins: [],
};
