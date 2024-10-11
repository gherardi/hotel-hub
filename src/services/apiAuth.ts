import { supabase } from '@/database/supabase-client';

import {
	type signupSchemaType,
	type loginSchemaType,
} from '@/components/auth/auth-schema';

export async function signup({
	email,
	password,
	first_name,
	last_name,
}: signupSchemaType) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				first_name,
				last_name,
			},
		},
	});

	if (error) throw new Error(error.message);

	return data;
}

export async function login({ email, password }: loginSchemaType) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);

	return data;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();
	if (!session.session) return null;

	const { data, error } = await supabase.auth.getUser();

	if (error) throw new Error(error.message);
	return data?.user;
}
