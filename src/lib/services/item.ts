import type Item from '$lib/interfaces/Item';
import type Unit from '$lib/interfaces/Unit';
import { supabaseClient } from '$lib/supabase';
import { getPageCount, getPagination } from '$lib/utils/pagination';
import SessionService from './session';

type ItemResponse = { items: Item[]; error: null | unknown };

export default class ItemService {
	private readonly TABLE_NAME: string = 'items';
	private sessionService = new SessionService();

	public createItem = async ({
		name,
		price,
		quantity,
		unitId
	}: {
		name: string;
		price: number;
		quantity: number;
		unitId: string;
	}) => {
		const {
			user: { id }
		} = await this.sessionService.getSession();
		const { data, error } = await supabaseClient
			.from(this.TABLE_NAME)
			.insert([{ name, quantity, price, userId: id, unitId }]);

		if (error) {
			throw error;
		}

		return data;
	};

	public updateItem = async (unit: Unit) => {
		const { data, error } = await supabaseClient
			.from(this.TABLE_NAME)
			.update({ fullName: unit.fullName, shortName: unit.shortName })
			.eq('id', unit.id);

		if (error) {
			throw error;
		}

		return data;
	};

	public deleteItem = async (itemId: string) => {
		const { data, error } = await supabaseClient.from(this.TABLE_NAME).delete().eq('id', itemId);

		if (error) {
			throw error;
		}

		return data;
	};

	public getItems = async (
		page: number,
		limit: number,
		searchKey?: string
	): Promise<[Item[], number]> => {
		const { from, to } = getPagination(page, limit);
		const {
			user: { id }
		} = await this.sessionService.getSession();
		let query = supabaseClient
			.from(this.TABLE_NAME)
			.select('*, unit:units(*)', { count: 'exact' })
			.eq('userId', id)
			.order('createdAt', { ascending: false })
			.range(from, to);

		if (searchKey?.length) {
			query = query.textSearch('fullName', searchKey, { type: 'websearch' });
		}

		const { data, error, count } = await query;

		if (error) {
			throw error;
		}

		return [data as Item[], count ? getPageCount(count, limit) : 0];
	};

	public getItemsQuery = async (userId: string): Promise<ItemResponse> => {
		const { data: items, error } = await this.getItemsOfUser(userId);

		return { items: items as Item[], error };
	};

	private getItemsOfUser = async (userId: string) => {
		return supabaseClient.from(this.TABLE_NAME).select('*').eq('userId', userId);
	};
}
