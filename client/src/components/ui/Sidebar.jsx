import { Home, CalendarDays, Church, CircleUserRound, LogOut } from 'lucide-react';

const navItems = [
	{
		name: 'Dashboard',
		path: 'dashboard',
		icon: <Home size={20} />,
	},
	{
		name: 'Prenotazioni',
		path: 'bookings',
		icon: <CalendarDays size={20} />,
	},
	{
		name: 'Camere',
		path: 'rooms',
		icon: <Church size={20} />,
	},
	{
		name: 'Profilo',
		path: 'profile',
		classNames: 'mt-auto',
		icon: <CircleUserRound size={20} />,
	},
];

export default function Sidebar({ view, setView }) {
	const handleLogOut = (e) => {
		e.preventDefault();
		console.log('log out');
	};
	return (
		<aside className='px-4 bg-neutral-800 h-svh min-w-fit w-[20vw] text-neutral-50'>
			<nav className='flex py-5 flex-col h-full gap-2 [&>*]:px-4 [&>*]:py-3 [&>*]:rounded [&>*]:block [&>*]:transition'>
				{navItems.map((item, index) => (
					<a
						key={index}
						className={`${view === item.path ? 'bg-neutral-600/50' : 'hover:bg-neutral-700/50'} ${
							item.classNames
						}`}
						href='#'
						onClick={(e) => {
							e.preventDefault();
							setView(item.path);
						}}
					>
						<div className='flex items-center gap-3'>
							{item.icon} {item.name}
						</div>
					</a>
				))}
				<a href='#' onClick={handleLogOut}>
					<div className='flex items-center gap-3'>
						<LogOut />
						Log out
					</div>
				</a>
			</nav>
		</aside>
	);
}

{
	/* <aside class='h-[100svh] flex flex-col px-5 py-10 gap-y-3 [&>*]:transition [&>*]:rounded-lg [&>*]:gap-3 [&>*]:cursor-pointer [&>*]:py-4 [&>*]:px-6'>
	<h1 class='text-xl md:text-3xl font-semibold !cursor-default !pb-14 !pt-2'>Logistica</h1>
	<div data-view='settings' class='flex hover:bg-hover/10 !bg-active/10'>
		<svg
			class='pointer-events-none'
			width='22'
			height='23'
			viewBox='0 0 22 23'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
		</svg>
		Impostazioni
	</div>
	<div data-view='matrice' class='flex hover:bg-hover/10'>
		<svg
			class='pointer-events-none'
			width='22'
			height='23'
			viewBox='0 0 22 23'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g clip-path='url(#clip0_51_110)'>
				<path
					d='M19.2498 4.16666H2.74984C1.73732 4.16666 0.916504 4.98747 0.916504 5.99999V17C0.916504 18.0125 1.73732 18.8333 2.74984 18.8333H19.2498C20.2624 18.8333 21.0832 18.0125 21.0832 17V5.99999C21.0832 4.98747 20.2624 4.16666 19.2498 4.16666Z'
					stroke='#F5F5F5'
					stroke-width='1.8'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
				<path
					d='M1 9H21.1667'
					stroke='#F5F5F5'
					stroke-width='1.8'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
				<path
					d='M1 14H21.1667'
					stroke='#F5F5F5'
					stroke-width='1.8'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_51_110'>
					<rect width='22' height='22' fill='white' transform='translate(0 0.5)' />
				</clipPath>
			</defs>
		</svg>
		Matrice
	</div>
	<div class='h-[2px] bg-hover/10 !py-0 !px-0 !cursor-default'></div>
	<div data-view='nordovest' class='flex hover:bg-hover/10'>
		<svg
			class='pointer-events-none'
			width='22'
			height='23'
			viewBox='0 0 22 23'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M11.0002 20.6667C16.0628 20.6667 20.1668 16.5626 20.1668 11.5C20.1668 6.4374 16.0628 2.33334 11.0002 2.33334C5.93755 2.33334 1.8335 6.4374 1.8335 11.5C1.8335 16.5626 5.93755 20.6667 11.0002 20.6667Z'
				stroke='#F5F5F5'
				stroke-width='1.8'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path
				d='M14.8866 7.61334L12.9433 13.4433L7.11328 15.3867L9.05661 9.55668L14.8866 7.61334Z'
				stroke='#F5F5F5'
				stroke-width='1.8'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
		Nord ovest
	</div>
	<div data-view='minimicosti' class='flex hover:bg-hover/10'>
		<svg
			class='pointer-events-none'
			width='22'
			height='23'
			viewBox='0 0 22 23'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M11.0002 20.6667C16.0628 20.6667 20.1668 16.5626 20.1668 11.5C20.1668 6.4374 16.0628 2.33334 11.0002 2.33334C5.93755 2.33334 1.8335 6.4374 1.8335 11.5C1.8335 16.5626 5.93755 20.6667 11.0002 20.6667Z'
				stroke='#F5F5F5'
				stroke-width='1.8'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path
				d='M7.3335 11.5H14.6668'
				stroke='#F5F5F5'
				stroke-width='1.8'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
		Minimi costi
	</div>
	<div data-view='riepilogo' class='flex mt-auto hover:bg-hover/10'>
		<svg
			class='pointer-events-none'
			width='22'
			height='23'
			viewBox='0 0 22 23'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M14.6665 4.16666H16.4998C16.9861 4.16666 17.4524 4.35981 17.7962 4.70363C18.14 5.04744 18.3332 5.51376 18.3332 5.99999V18.8333C18.3332 19.3196 18.14 19.7859 17.7962 20.1297C17.4524 20.4735 16.9861 20.6667 16.4998 20.6667H5.49984C5.01361 20.6667 4.54729 20.4735 4.20347 20.1297C3.85966 19.7859 3.6665 19.3196 3.6665 18.8333V5.99999C3.6665 5.51376 3.85966 5.04744 4.20347 4.70363C4.54729 4.35981 5.01361 4.16666 5.49984 4.16666H7.33317'
				stroke='#F5F5F5'
				stroke-width='1.8'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path
				d='M13.7502 2.33334H8.25016C7.7439 2.33334 7.3335 2.74375 7.3335 3.25001V5.08334C7.3335 5.5896 7.7439 6.00001 8.25016 6.00001H13.7502C14.2564 6.00001 14.6668 5.5896 14.6668 5.08334V3.25001C14.6668 2.74375 14.2564 2.33334 13.7502 2.33334Z'
				stroke='#F5F5F5'
				stroke-width='1.8'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
		Riepilogo
	</div>
</aside>; */
}
