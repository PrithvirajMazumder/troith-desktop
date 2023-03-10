
export const getPageCount = (count: number, limit: number) => Math.ceil(count / limit);

export const getPagination = (page: number, size: number) => {
	const limit = size ? +size - 1 : 3;
	const from = page ? (page - 1) * limit : 0;
	const to = page ? from + (size - 1) : size;

	return { from, to };
};
