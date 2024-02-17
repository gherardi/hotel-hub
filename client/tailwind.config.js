import formsPlugin from '@tailwindcss/forms';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	// darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				geist: ['"Geist"', ...defaultTheme.fontFamily.sans],
				inter: ['Inter', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				'cold-gray': '#1C1C1C', // sfondo
				'mine-shaft': '#232323', // sfondo scuro
				'gallery': '#ededed', // primario
				'dove-gray': '#7e7e7e', // secondario
			},
		},
	},
	plugins: [formsPlugin],
};
