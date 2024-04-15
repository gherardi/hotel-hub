import { useForm } from 'react-hook-form';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useAuth } from '../AuthProvider.jsx';

export default function CreateRoomsButton() {
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
			const res = await fetch('http://localhost:3000/api/camere', {
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

	return (
		<>
			<button
				type='button'
				onClick={openModal}
				className='rounded-md mb-6 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
			>
				Crea stanza
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
											<label htmlFor='type' className='block text-sm font-medium leading-6 '>
												Tipo di camera
											</label>
											<div className='mt-2'>
												<select
													{...register('type')}
													id='type'
													name='type'
													disabled={isSubmitting}
													required
													className='block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
												>
													<option value=''>Choose an option</option>
													<option value='Single'>Camera singola</option>
													<option value='Double'>Camera doppia</option>
													<option value='Triple'>Camera tripla</option>
													<option value='Quadruple'>Camera quadrupla</option>
													<option value='Superior'>Camera superior</option>
													<option value='Deluxe'>Camera deluxe</option>
												</select>
											</div>
										</div>

										<div>
											<label htmlFor='price' className='block text-sm font-medium leading-6 '>
												Prezzo a notte
											</label>
											<div className='mt-2'>
												<input
													{...register('price')}
													id='price'
													name='price'
													type='number'
													min={0}
													required
													disabled={isSubmitting}
													className='block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
												/>
											</div>
										</div>

										<div>
											<label htmlFor='number' className='block text-sm font-medium leading-6 '>
												Numbero di camera
											</label>
											<div className='mt-2'>
												<input
													{...register('number')}
													id='number'
													name='number'
													type='number'
													min={1}
													required
													disabled={isSubmitting}
													className='block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'
												/>
											</div>
										</div>

										<div className='pt-4'>
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
