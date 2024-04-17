export default function Label({htmlFor, children}) {
	return <label htmlFor={htmlFor} className='block text-sm font-medium leading-6 '>{children}</label>
}
