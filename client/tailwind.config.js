import formsPlugin from '@tailwindcss/forms';
// import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	// darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				// geist: ['"Geist"', ...defaultTheme.fontFamily.sans],
				// inter: ['Inter', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				background: 'hsl(var(--color-background) / 1)',
				'background-hover': 'hsl(var(--color-background-hover) / 1)',
				content: 'hsl(var(--color-content) / 1)',
				accent: 'hsl(var(--color-accent) / 1)',
			},
		},
	},
	plugins: [formsPlugin],
};
