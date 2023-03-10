import type Unit from '$lib/interfaces/Unit';
import { supabaseClient } from '$lib/supabase';
import { getPageCount, getPagination } from '$lib/utils/pagination';
import SessionService from './session';

type UnitResponse = { units: Unit[]; error: null | unknown };

export default class UnitService {
	private readonly TABLE_NAME: string = 'units';
	private sessionService = new SessionService();

	public createUnit = async (fullName: string, shortName: string) => {
		const {
			user: { id }
		} = await this.sessionService.getSession();
		const { data, error } = await supabaseClient
			.from(this.TABLE_NAME)
			.insert([{ fullName, shortName, userId: id }]);

		if (error) {
			throw error;
		}

		return data;
	};

	public updateUnit = async (unit: Unit) => {
		const { data, error } = await supabaseClient
			.from(this.TABLE_NAME)
			.update({ fullName: unit.fullName, shortName: unit.shortName })
			.eq('id', unit.id);

		if (error) {
			throw error;
		}

		return data;
	};

	public deleteUnit = async (unitId: string) => {
		const { data, error } = await supabaseClient.from(this.TABLE_NAME).delete().eq('id', unitId);

		if (error) {
			throw error;
		}

		return data;
	};

	public getUnits = async (
		page: number,
		limit: number,
		searchKey?: string
	): Promise<[Unit[], number]> => {
		const { from, to } = getPagination(page, limit);
		const {
			user: { id }
		} = await this.sessionService.getSession();
		let query = supabaseClient
			.from(this.TABLE_NAME)
			.select('*', { count: 'exact' })
			.eq('userId', id)
			.order('createdAt', { ascending: true })
			.range(from, to);

		if (searchKey?.length) {
			query = query.textSearch('fullName', searchKey, { type: 'websearch' });
		}

		const { data, error, count } = await query;

		if (error) {
			throw error;
		}

		return [data as Unit[], count ? getPageCount(count, limit) : 0];
	};

	public getUnitsQuery = async (userId: string): Promise<UnitResponse> => {
		const { data: units, error } = await this.getUnitsOfUser(userId);

		return { units: units as Unit[], error };
	};

	private getUnitsOfUser = async (userId: string) => {
		return supabaseClient.from(this.TABLE_NAME).select('*').eq('userId', userId);
	};
}
