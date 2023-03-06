import type { Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals }) => {
		const { error: err } = await locals.supabase.auth.signOut();

		if (err) {
			throw error(500, 'signing out failed');
		}

		throw redirect(303, '/');
	}
};
