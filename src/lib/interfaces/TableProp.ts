
export interface TableRowAction<T> {
	icon: string,
	onClick: (param: T) => void,
}

export interface TableProp<T> {
	rows: { rowName: string; key: string }[];
	actions?: TableRowAction<T>[]
}
