export interface Company {
	name: string;
	address: string;
	gstin: string;
	email: string;
	phone: number;
	bankDetails: BankDetails;
	tagLine?: string;
	id?: string;
	createdAt?: Date | string | number;
}

export interface BankDetails {
	bankName: string;
	accountHolderName: string;
	accountNumber: number;
	ifscCode: string;
}
