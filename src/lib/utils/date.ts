export const getDatetoString = (date = new Date()) => {
	let month = '' + (date.getMonth() + 1),
		day = '' + date.getDate();
	const year = date.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
};
