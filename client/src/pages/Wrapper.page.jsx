export default function Wrapper({ children }) {
	// return <div className='relative w-full overflow-hidden bg-neutral-900 font-inter h-svh text-gray-50'>
	return <div className='overflow-hidden h-svh bg-background text-content'>{children}</div>;
}
