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
import { Room } from './columns';
import { BASE_URL } from '@/config';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { useUpdateRoom } from '@/hooks/useUpdateRoom';
import { useToast } from '@/components/ui/use-toast';

interface ActionsProps {
	room: Room;
}

export default function Actions({ room }: ActionsProps) {
	const { toast } = useToast();
	const { token } = useAuth();
	const queryClient = useQueryClient();

	const [showDropdown, setShowDropdown] = useState(false);
	const [showModifyModal, setShowModifyModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const { mutate, isPending } = useUpdateRoom();

	const [roomName, setRoomName] = useState(room.name);
	const [roomPrice, setRoomPrice] = useState(room.price);
	const [roomCapacity, setRoomCapacity] = useState(room.capacity);

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
						navigator.clipboard.writeText(room.id);
						toast({
							title: 'Successo',
							description: 'ID della camera copiato negli appunti',
						});
					}}
				>
					Copia id camera
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<Sheet open={showModifyModal} onOpenChange={setShowModifyModal}>
					<SheetTrigger asChild>
						<DropdownMenuItem
							onClick={(e) => {
								e.preventDefault();
								setShowModifyModal(true);
							}}
						>
							Modifica
						</DropdownMenuItem>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Modifica camera</SheetTitle>
							<SheetDescription>
								Apporta modifiche alla tua camera qui. Fai clic su Salva quando
								hai finito.
							</SheetDescription>
						</SheetHeader>
						<div className='grid gap-4 py-4'>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='id' className='text-right'>
									ID
								</Label>
								<Input
									id='id'
									value={room.id}
									className='col-span-3'
									disabled={true}
								/>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='created_at' className='text-right'>
									Data creazione
								</Label>
								<Input
									id='created_at'
									value={new Date(room.created_at).toLocaleDateString()}
									className='col-span-3'
									disabled={true}
								/>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='name' className='text-right'>
									Numero
								</Label>
								<Input
									id='name'
									value={roomName}
									className='col-span-3'
									disabled={isPending}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										setRoomName(e.target.value);
									}}
								/>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='price' className='text-right'>
									Prezzo
								</Label>
								<Input
									type='number'
									id='price'
									value={roomPrice}
									className='col-span-3'
									disabled={isPending}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										setRoomPrice(Number(e.target.value));
									}}
								/>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='capacity' className='text-right'>
									Capacità
								</Label>
								<Input
									type='number'
									id='capacity'
									value={roomCapacity}
									className='col-span-3'
									disabled={isPending}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										setRoomCapacity(Number(e.target.value));
									}}
								/>
							</div>
						</div>
						<SheetFooter>
							<SheetClose asChild>
								<Button
									onClick={(e) => {
										e.preventDefault();
										setShowModifyModal(false);
										setShowDropdown(false);
										mutate({
											id: room.id,
											name: roomName,
											price: roomPrice,
											capacity: roomCapacity,
										});
									}}
								>
									Salva modifiche
								</Button>
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet>

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
								Sei sicuro di voler eliminare questa camera?
							</AlertDialogTitle>
							<AlertDialogDescription>
								{/* This action cannot be undone. This will permanently delete your
								account and remove your data from our servers. */}
								Questa azione non può essere annullata.
								<br />
								Questo eliminerà definitivamente la tua camera e rimuoverà i
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
									const res = await fetch(`${BASE_URL}/rooms/${room.id}`, {
										method: 'DELETE',
										headers: {
											'Content-Type': 'application/json',
											Authorization: `Bearer ${token}`,
										},
									});
									const resData = await res.json();
									if (resData.status !== 'success') {
										alert("Errore durante l'eliminazione della camera");
										return;
									}
									queryClient.invalidateQueries({ queryKey: ['rooms'] });
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
