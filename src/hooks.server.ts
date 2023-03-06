import '$lib/supabase';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { session, supabaseClient } = await getSupabase(event);
	event.locals.supabase = supabaseClient;
	event.locals.session = session;

	if (event.url.pathname.startsWith('/app')) {
		if (!event.locals.session) {
			throw redirect(303, '/');
		}
	}

	return resolve(event);
};
