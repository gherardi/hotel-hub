export default function Input({
	type,
	name,
	placeholder = '',
	isPending = false,
	reactHookFormRegister,
}) {
	return (
		<input
			{...reactHookFormRegister}
			id={name}
			name={name}
			placeholder={placeholder}
			type={type}
			disabled={isPending}
			className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
		/>
	);
}
