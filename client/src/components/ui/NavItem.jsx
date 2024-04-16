export default function NavItem({ children, to, setView }) {
	return (
		<a
			href={'#' + to}
			className='flex items-center px-3 py-1.5 transition-colors rounded-md duration-300 hover:bg-accent/15 hover:text-accent focus-visible:bg-accent/15 focus-visible:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
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
			{children}
		</a>
	);
}
