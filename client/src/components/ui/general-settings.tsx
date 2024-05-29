import { Button } from '@/components/ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function GeneralSettings() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Tema</CardTitle>
				<CardDescription>Scegli il tema dell'app</CardDescription>
			</CardHeader>
			<CardContent>
				<form>
					<Input placeholder='Store Name' />
				</form>
			</CardContent>
			<CardFooter className='border-t px-6 py-4'>
				<Button>Salva</Button>
			</CardFooter>
		</Card>
	);
}
