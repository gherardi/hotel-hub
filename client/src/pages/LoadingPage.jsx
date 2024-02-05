import { ring } from 'ldrs';

ring.register();

export default function LoadingPage() {
  return (
    <div className='h-svh flex items-center justify-center'>
      <l-ring
        size='40'
        stroke='5'
        bg-opacity='0'
        speed='2'
        color='lightgray'
      ></l-ring>
    </div>
  );
}
