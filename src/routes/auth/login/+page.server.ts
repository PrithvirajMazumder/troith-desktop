import { authFormSchema } from '$lib/validation/authSchema';
import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			authFormSchema.parse(body);
		} catch (validationError: any) {
			const { fieldErrors: formErrors } = validationError.flatten();
			const { password, ...rest } = body;

			return {
				data: rest,
				errors: formErrors
			};
		}

		const { data, error: err } = await locals.supabase.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					message: err.message
				});
			}
			return fail(500, {
				message: err.message
			});
		}

		throw redirect(303, '/app');
	}
};
