import { useForm } from 'react-hook-form';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider.jsx';

export default function CreateBookingsButton() {
	let [isOpen, setIsOpen] = useState(false);
	const jwt = useAuth();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm();

	const onSubmit = async function (data) {
		try {
			console.log(data);
			console.log('jwt:', jwt);
			// return;
			const res = await fetch('http://localhost:3000/api/prenotazioni', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + jwt,
				},
				body: JSON.stringify(data),
			});

			const ret = await res.json();
			if (ret.status !== 'success') throw new Error(ret.message);

			closeModal();
			window.location.reload();
		} catch (err) {
			console.error(err);
		}
	};

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		const getRooms = async () => {
			try {
				const res = await fetch('http://localhost:3000/api/camere', {
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				});
				const { data } = await res.json();
				setRooms(data);
			} catch (err) {
				console.error(err);
			}
		};
		getRooms();
	}, [jwt]);

	return (
		<>
			<button
				type='button'
				onClick={openModal}
				className='rounded-md mb-6 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
			>
				Crea prenotazione
			</button>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black/25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex items-center justify-center min-h-full p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className='w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
									<Dialog.Title
										as='h3'
										className='mb-2 text-lg font-medium leading-6 text-gray-900'
									>
										Crea prenotazione
									</Dialog.Title>

									<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
										<div>
											<label
												htmlFor='customer_name'
												className='block text-sm font-medium leading-6 '
											>
												Nome cliente
											</label>
											<div className='mt-2'>
												<input
													{...register('customer_name')}
													id='customer_name'
													name='customer_name'
													type='text'
													required
													disabled={isSubmitting}
													className='block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
												/>
											</div>
										</div>

										<div>
											<div className='flex items-center justify-between'>
												<label htmlFor='start' className='block text-sm font-medium leading-6 '>
													Data arrivo
												</label>
											</div>
											<div className='mt-2'>
												<input
													{...register('start')}
													id='start'
													name='start'
													type='date'
													required
													disabled={isSubmitting}
													className='block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
												/>
											</div>
										</div>

										<div>
											<div className='flex items-center justify-between'>
												<label htmlFor='end' className='block text-sm font-medium leading-6 '>
													Data partenza
												</label>
											</div>
											<div className='mt-2'>
												<input
													{...register('end')}
													id='end'
													name='end'
													type='date'
													// min='2024-04-01'
													// max='2024-04-30'
													autoComplete='end'
													required
													disabled={isSubmitting}
													className='block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
												/>
											</div>
										</div>

										<div>
											<div className='flex items-center justify-between'>
												<label htmlFor='room' className='block text-sm font-medium leading-6 '>
													Camera
												</label>
											</div>
											<div className='mt-2'>
												<select
													{...register('room_id')}
													id='room_id'
													name='room_id'
													disabled={isSubmitting}
													required
													className='block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
												>
													<option value=''>Choose an option</option>
													{rooms &&
														rooms.map((room) => (
															<option key={room.id} value={room.id}>
																{room.number} - {room.type} ({room.price}€ a notte)
															</option>
														))}
												</select>
											</div>
										</div>

										<div>
											<button
												type='submit'
												disabled={isSubmitting}
												className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
											>
												{isSubmitting ? 'Loading...' : 'Aggiungi'}
											</button>
										</div>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
