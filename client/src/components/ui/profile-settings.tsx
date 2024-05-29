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

export default function ProfileSettings() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Informazioni</CardTitle>
				<CardDescription>Modifica le tue informazioni</CardDescription>
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
