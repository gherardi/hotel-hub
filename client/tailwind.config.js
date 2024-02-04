import formsPlugin from '@tailwindcss/forms';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	// darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				// 'geist': ['"Geist"', ...defaultTheme.fontFamily.sans],
				inter: ['Inter', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [formsPlugin],
};
