import { writable } from 'svelte/store';

export type ToastType = 'info' | 'success';

export interface ToastProps {
	message: string;
	type: ToastType;
}

const ToastStore = writable<ToastProps[]>([] as ToastProps[]);

export default ToastStore;
