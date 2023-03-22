
export interface TableRowAction<T> {
	icon: string,
	onClick: (param: T) => void,
}

type StringFuntion<T> = (data: T) => string;

export interface TableProp<T> {
	rows: { rowName: string; key: (string | StringFuntion<T>) }[];
	actions?: TableRowAction<T>[]
}
