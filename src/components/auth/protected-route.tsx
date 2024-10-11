import { PropsWithChildren, useEffect } from 'react';
import { useSessionStore } from '@/stores/session-store';
import Loading from '@/components/auth/loading';
import { supabase } from '@/database/supabase-client';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const session = useSessionStore((state) => state.session);
	const setSession = useSessionStore((state) => state.setSession);

	useEffect(() => {
		const secureRoute = async () => {
			await supabase.auth.getSession().then(({ data: { session } }) => {
				setSession(session);
				if (session === null) {
					window.location.href = '/';
				}
			});
		};

		secureRoute();
	}, [session]);

	if (session === null) {
		return <Loading />;
	}
	
	if (session) return children;
}
