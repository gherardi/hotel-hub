import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { MoreHorizontal } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { Booking } from './columns';
import { BASE_URL } from '@/config';

import { useToast } from '@/components/ui/use-toast';

interface ActionsProps {
	booking: Booking;
}

export default function Actions({ booking }: ActionsProps) {
	const { toast } = useToast();
	const { token } = useAuth();
	const queryClient = useQueryClient();

	const [showDropdown, setShowDropdown] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	return (
		<DropdownMenu open={showDropdown} onOpenChange={setShowDropdown}>
			<DropdownMenuTrigger asChild>
				<Button variant={'ghost'} className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Azioni</DropdownMenuLabel>
				<DropdownMenuItem
					onClick={() => {
						navigator.clipboard.writeText(booking.id);
						toast({
							title: 'Successo',
							description: 'ID della camera copiato negli appunti',
						});
					}}
				>
					Copia id camera
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
					<AlertDialogTrigger asChild>
						<DropdownMenuItem
							onClick={(e) => {
								e.preventDefault();
								setShowDeleteModal(true);
							}}
						>
							Elimina
						</DropdownMenuItem>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Sei sicuro di voler eliminare questa prenotazione?
							</AlertDialogTitle>
							<AlertDialogDescription>
								{/* This action cannot be undone. This will permanently delete your
								account and remove your data from our servers. */}
								Questa azione non può essere annullata.
								<br />
								Questo eliminerà definitivamente la tua prenotazione e rimuoverà i
								dati dai nostri server.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel
								onClick={() => {
									console.log('cancel');
									setShowDeleteModal(false);
									setShowDropdown(false);
								}}
							>
								Annulla
							</AlertDialogCancel>
							<AlertDialogAction
								className='bg-destructive hover:bg-destructive/80'
								onClick={async () => {
									const res = await fetch(`${BASE_URL}/bookings/${booking.id}`, {
										method: 'DELETE',
										headers: {
											'Content-Type': 'application/json',
											Authorization: `Bearer ${token}`,
										},
									});
									const resData = await res.json();
									if (resData.status !== 'success') {
										alert("Errore durante l'eliminazione della prenotazione");
										return;
									}
									queryClient.invalidateQueries({ queryKey: ['bookings'] });
									setShowDeleteModal(false);
									setShowDropdown(false);
								}}
							>
								Confermo
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
