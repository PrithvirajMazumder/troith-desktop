import UnitService from "$lib/services/unit";
import { getServerSession } from "@supabase/auth-helpers-sveltekit";
import type { PageServerLoad } from "./$types";
import {fail} from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
	const session = await getServerSession(event);
	const unitService = new UnitService();

	if (!session) {
		return fail(500)

	}
	
	const { units, error } = await unitService.getUnitsQuery(session.user.id);

	if (error) {
		return fail(500)
	}
	
	return { units };
};