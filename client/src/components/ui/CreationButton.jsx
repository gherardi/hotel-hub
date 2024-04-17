export default function CreationButton({ handleClick, value, children }) {
	return (
		<>
			<button
				onClick={handleClick}
				className='px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
			>
				{value}
			</button>
			{children}
		</>
	);
}
