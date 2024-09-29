import { supabase } from '@/database/supabase-client';

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) {
		alert('Error logging out: ' + JSON.stringify(error.message, null, 2));
		return;
	}
	window.location.href = '/';
}
