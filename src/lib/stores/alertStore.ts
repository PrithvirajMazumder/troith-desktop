import { writable } from 'svelte/store';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
	message: string;
	type: AlertType;
	title?: string;
}

const AlertStore = writable<AlertProps | null>(null);

export default AlertStore;
