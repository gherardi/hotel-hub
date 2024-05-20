import Header from '@/components/sections/header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<>
			<Header />
			<section className='container'>
				pagina non trovata
				<Button variant={'link'}>
					<Link to={'/'}>Ritorna alla home</Link>
				</Button>
			</section>
		</>
	);
}
