import { Link } from 'react-router-dom';

import HomeLayout from '@/layouts/home-layout';
import { Button } from '@/components/ui/button';

export default function NotFound() {
	return (
		<HomeLayout>
			pagina non trovata
			<Button variant={'link'}>
				<Link to={'/'}>Ritorna alla home</Link>
			</Button>
		</HomeLayout>
	);
}
