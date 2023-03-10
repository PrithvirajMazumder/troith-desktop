import { writable, type Writable } from 'svelte/store';

const usePagination = <T>(
	fetchData: (pageNo: number, limit: number, searchKey?: string) => Promise<[T[], number]>,
	limit = 10
): [
	Writable<T[]>,
	Writable<boolean>,
	Writable<unknown | null>,
	Writable<number>,
	Writable<number>,
	typeof loadData
] => {
	const data = writable<T[]>([]);
	const isLoading = writable<boolean>(false);
	const hasError = writable<unknown | null>(null);
	const currentPage = writable<number>(0);
	const lastPage = writable<number>(0);

	const loadData = async (pageNo = 1, searchKey?: string) => {
		isLoading.set(true);
		try {
			const [fetchedData, last] = await fetchData(pageNo, limit, searchKey);
			data.set(fetchedData);
			currentPage.set(pageNo);
			lastPage.set(last);
		} catch (error) {
			hasError.set(error);
		} finally {
			isLoading.set(false);
		}
	};

	return [data, isLoading, hasError, currentPage, lastPage, loadData];
};

export default usePagination;
