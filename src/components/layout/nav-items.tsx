import {
	Home,
	Package,
	LineChart,
	Settings,
} from 'lucide-react';

export const navItems = [
	{
		name: 'Dashboard',
		icon: <Home className='w-4 h-4' />,
		path: '/dashboard',
	},
	{
		name: 'Prenotazioni',
		icon: <LineChart className='w-4 h-4' />,
		path: '/bookings',
	},
	{
		name: 'Camere',
		icon: <Package className='w-4 h-4' />,
		path: '/rooms',
	},
	{
		name: 'Impostazioni',
		icon: <Settings className='w-4 h-4' />,
		path: '/settings',
	},
];
