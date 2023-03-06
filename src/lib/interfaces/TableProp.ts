export interface TableProp<T> {
	data: T[];
	rows: { rowName: string; key: string }[];
}
