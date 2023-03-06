import type { PageLoad } from './$types';

export const load = (() => {
	return {
		post: {
			title: 'hello hello',
			content: 'I am in moon'
		}
	};
}) satisfies PageLoad;
