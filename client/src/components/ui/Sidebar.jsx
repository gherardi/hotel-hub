import { Home, CalendarDays, Church, CircleUserRound, LogOut } from 'lucide-react';

export default function NewSidebar({ setView }) {
	return (
		<aside className='w-[16vw] px-3 py-6 border-r min-w-fit h-svh'>
			<nav className='flex flex-col h-full'>
				<div className='space-y-2'>
					<label className='block px-3 text-xs uppercase text-content/70'>navigations</label>
					<Link icon={<Home size={16} />} text={'Dashboard'} setView={setView} to={'dashboard'} />

					<Link
						icon={<CalendarDays size={16} />}
						text={'Prenotazioni'}
						setView={setView}
						to={'bookings'}
					/>

					<Link icon={<Church size={16} />} text={'Camere'} setView={setView} to={'rooms'} />
				</div>

				<div className='mt-auto space-y-2'>
					<Link
						icon={<CircleUserRound size={16} />}
						text={'Profile'}
						setView={setView}
						to={'profile'}
					/>
					<Link icon={<LogOut size={16} />} text={'Log Out'} setView={setView} to={'logout'} />
				</div>
			</nav>
		</aside>
	);
}

function Link({ icon, text, to, setView }) {
	return (
		<a
			className='flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-content/70 hover:bg-accent/5 hover:text-accent/90'
			href={'#' + to}
			onClick={(e) => {
				e.preventDefault();
				if (to === 'logout') {
					document.cookie = 'jwt=;';
					localStorage.clear();
					location.reload();
				}
				setView(to);
			}}
		>
			{icon}
			<span className='mx-2 font-medium'>{text}</span>
		</a>
	);
}
