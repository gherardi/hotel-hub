import { ring } from 'ldrs';

ring.register();

export default function LoadingPage() {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<l-ring size='40' stroke='5' bg-opacity='0.1' speed='2' color='lightgray'></l-ring>
		</div>
	);
}
