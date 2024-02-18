import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';

export default function HomePage() {
	const { data, isLoading, error } = useApi('http://localhost:3000/api/status');

	return (
		<div className='h-svh'>
			<div className='px-3 pt-20 mx-auto sm:w-4/5'>
				<h1 className='text-6xl font-extrabold sm:text-center text-balance'>
					Welcome to Hotel <span className='text-indigo-500'>Hub</span>
				</h1>
				<p className='mx-auto mt-4 sm:w-5/6 sm:text-center text-dove-gray text-balance'>
					Lorem ipsum dolor sit amet consectetur. Massa etiam faucibus sit imperdiet turpis blandit
					est faucibus est. Mauris facilisis consectetur etiam at faucibus et erat ut. Aliquam quam
					est nisi vitae et non. Nulla ultrices varius tincidunt leo risus.
				</p>
				<div className='flex items-center justify-center gap-8 mt-12'>
					<Link to='/login' className='px-6 py-2 font-medium bg-indigo-500 rounded-md'>
						login
					</Link>
					<Link to='/signup' className=''>
						signup
					</Link>
				</div>
				<div className='mt-10 text-center'>
					{isLoading
						? 'Server status: Checking'
						: data
						? '🟢 Server status: OK!'
						: error
						? '🔴 Server status: Not ready!'
						: null}
				</div>
			</div>
		</div>
	);
}
