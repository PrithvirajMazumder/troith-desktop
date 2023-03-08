import type Unit from '$lib/interfaces/Unit';
import { supabaseClient } from '$lib/supabase';

type UnitResponse = { units: Unit[]; error: null | unknown };

export default class UnitService {
	private readonly TABLE_NAME: string = 'units';

	public getUnits = async (userId: string): Promise<UnitResponse> => {
        const {data: units, error} = await this.getUnitsOfUser(userId);

        return {units: units as Unit[], error};
    };

	private getUnitsOfUser = async (userId: string) => {
		return supabaseClient.from(this.TABLE_NAME).select('*').eq('userId', userId);
	};
}
