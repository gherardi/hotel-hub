import { UsersRound, LogOut, Hotel, CircleUserRound } from 'lucide-react';
import NavItem from '../ui/NavItem';

export default function AdminSidebar({ setView }) {
	return (
		<aside className='w-[16vw] px-3 py-6 border-r min-w-fit h-svh bg-background-hover/50 text-content/70'>
			<nav className='flex flex-col h-full'>
				<div className='space-y-2'>
					<p className='block px-3 text-xs uppercase'>ruolo: amministratore</p>
					<NavItem to={'users'} setView={setView}>
						<UsersRound size={16} />
						<span className='mx-2 font-medium'>Utenti</span>
					</NavItem>
					<NavItem to={'hotels'} setView={setView}>
						<Hotel size={16} />
						<span className='mx-2 font-medium'>Hotels</span>
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
