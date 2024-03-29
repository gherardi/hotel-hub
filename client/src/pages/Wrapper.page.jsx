export default function Wrapper({ children }) {
	// return <div className='relative w-full overflow-hidden bg-neutral-900 font-inter h-svh text-gray-50'>
	return <div className='h-svh text-neutral-800 bg-neutral-50'>{children}</div>;
}
