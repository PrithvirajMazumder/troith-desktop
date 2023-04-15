export default interface Party {
	name: string;
	address: string;
	gstin: string;
	createdAt: Date | number | string;
	id?: string;
	email?: string;
}
