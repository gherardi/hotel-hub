import {
	Home,
	CalendarDays,
	Church,
	CircleUserRound,
	LogOut,
} from 'lucide-react';
import NavItem from '../ui/NavItem';

export default function NewSidebar({ setView }) {
	return (
		<aside className='w-[16vw] px-3 py-6 border-r min-w-fit h-svh bg-background-hover/50 text-content/70'>
			<nav className='flex flex-col h-full'>
				<div className='space-y-2'>
					<p className='block px-3 text-xs uppercase'>ruolo: utente</p>
					<NavItem to={'dashboard'} setView={setView}>
						<Home size={16} />
						<span className='mx-2 font-medium'>Dashboard</span>
					</NavItem>
					<NavItem to={'bookings'} setView={setView}>
						<CalendarDays size={16} />
						<span className='mx-2 font-medium'>Prenotazioni</span>
					</NavItem>
					<NavItem to={'rooms'} setView={setView}>
						<Church size={16} />
						<span className='mx-2 font-medium'>Camere</span>
					</NavItem>
				</div>

				<div className='mt-auto space-y-2'>
					<NavItem to={'profile'} setView={setView}>
						<CircleUserRound size={16} />
						<span className='mx-2 font-medium'>Profilo</span>
					</NavItem>
					<NavItem to={'logout'} setView={setView}>
						<LogOut size={16} />
						<span className='mx-2 font-medium'>Log Out</span>
					</NavItem>
				</div>
			</nav>
		</aside>
	);
}
