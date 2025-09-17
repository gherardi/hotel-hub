import { Button } from '@/components/ui/button';

type ErrorFallbackProps = {
	error: Error;
	resetErrorBoundary: () => void;
};

export function ErrorFallback({
	error,
	resetErrorBoundary,
}: ErrorFallbackProps) {
	return (
		<div className='grid place-content-center h-svh'>
			<p className='font-medium'>error fallback</p>
			<code className='text-gray-400'>{error.message}</code>
			<div className='mt-4'>
				<Button onClick={resetErrorBoundary}>reset</Button>
			</div>
		</div>
	);
}
