import type Unit from '$lib/interfaces/Unit';

export default interface Item {
	name: string;
	price: number;
	quantity: number;
	unit?: Unit;
	unitId?: string;
	createdAt?: Date;
	updatedAt?: Date;
	id?: string;
}
