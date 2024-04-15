import { UsersRound, LogOut, Hotel } from 'lucide-react';

export default function AdminSidebar({ setView }) {
	return (
		<aside className='w-[16vw] px-3 py-6 border-r min-w-fit h-svh bg-background-hover/50 text-content/70'>
			<nav className='flex flex-col h-full'>
				<div className='space-y-2'>
					<p className='block px-3 text-xs uppercase'>ruolo: amministratore</p>
					<Link
						icon={<UsersRound size={16} />}
						text={'Utenti'}
						setView={setView}
						to={'users'}
					/>
					<Link
						icon={<Hotel size={16} />}
						text={'Hotels'}
						setView={setView}
						to={'hotels'}
					/>
				</div>

				<div className='mt-auto space-y-2'>
					<Link
						icon={<LogOut size={16} />}
						text={'Log Out'}
						setView={setView}
						to={'logout'}
					/>
				</div>
			</nav>
		</aside>
	);
}

function Link({ icon, text, to, setView }) {
	return (
		<a
			className='flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-accent/5 hover:text-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
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
