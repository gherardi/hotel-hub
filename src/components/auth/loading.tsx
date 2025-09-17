import { ring } from 'ldrs';

ring.register();
export default function Loading() {
	return (
		<div className='flex items-center justify-center bg-black/75 h-svh'>
			<l-ring
				size='32'
				stroke='4'
				bg-opacity='0'
				speed='2'
				color='white'
			></l-ring>
		</div>
	);
}
