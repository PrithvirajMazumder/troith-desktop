import { supabaseClient } from '$lib/supabase';
import type { Session } from '@supabase/supabase-js';

export default class SessionService {
	public getSession = async (): Promise<Session> => {
		const { data, error } = await supabaseClient.auth.getSession();

		if (error) {
			throw error;
		}

		return data.session as Session;
	};
}
