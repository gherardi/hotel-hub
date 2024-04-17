export default function SubmitButton({ children, isPending }) {
	return (
		<button
			type='submit'
			className='w-full rounded-md bg-indigo-600 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
			disabled={isPending}
		>
			{isPending ? 'Caricamento...' : children}
		</button>
	);
}
