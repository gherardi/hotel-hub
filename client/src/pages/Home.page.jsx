import { Link } from 'react-router-dom';

export default function HomePage() {
	return (
		<div className='px-3 pt-20 mx-auto sm:w-4/5'>
			{/* <h1 className='text-6xl font-extrabold sm:text-center text-balance'> */}
			<h1 className='font-semibold'>
				Welcome to Hotel <span className='text-indigo-500'>Hub</span>
			</h1>
			{/* <p className='mx-auto mt-4 text-gray-400 sm:w-5/6 sm:text-center text-balance'> */}
			<p className=''>
				Lorem ipsum dolor sit amet consectetur. Massa etiam faucibus sit imperdiet turpis blandit
				est faucibus est. Mauris facilisis consectetur etiam at faucibus et erat ut. Aliquam quam
				est nisi vitae et non. Nulla ultrices varius tincidunt leo risus.
			</p>
			{/* <code className='block mt-5 text-center'>user@gmail.com | qwerty123.</code> */}
			<code className=''>user@gmail.com | qwerty123.</code>
			{/* <code className='block mt-5 text-center'>admin@gmail.com | qwerty123.</code> */}
			<code className=''>admin@gmail.com | qwerty123.</code>
			{/* <div className='flex items-center justify-center gap-8 mt-12'> */}
			<div className='gap-4 space-x-5'>
				{/* <Link to='/login' className='px-6 py-2 font-medium bg-indigo-500 rounded-md'> */}
				<Link to='/login' className='underline bg-indigo-500'>
					login
				</Link>
				<Link to='/signup' className='underline'>
					signup
				</Link>
			</div>
		</div>
	);
}
