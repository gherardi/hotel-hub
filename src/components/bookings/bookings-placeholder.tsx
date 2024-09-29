import { Button } from '@/components/ui/button';

type BookingsPlaceholderProps = {
	setOpen: (open: boolean) => void;
};

export function BookingsPlaceholder({ setOpen }: BookingsPlaceholderProps) {
	return (
		<div className='flex items-center justify-center flex-1 border border-dashed rounded-lg shadow-sm'>
			<div className='flex flex-col items-center gap-1 text-center'>
				<h3 className='text-2xl font-bold tracking-tight'>
					Non hai nessuna prenotazione
				</h3>
				<p className='text-sm text-muted-foreground'>
					Puoi iniziare a creare una nuova prenotazione.
				</p>
				<Button className='mt-4' onClick={() => setOpen(true)}>
					Aggiungi prenotazione
				</Button>
			</div>
		</div>
	);
}
