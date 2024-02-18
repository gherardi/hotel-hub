export const useLocalStorage = (key) => {
	const setItem = (value) => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (err) {
			console.log(err);
		}
	};

	const getItem = () => {
		try {
			const item = window.localStorage.getItem(key);
			return value ? JSON.parse(value) : undefined;
		} catch (err) {
			console.log(err);
		}
	};

	const removeItem = () => {
		try {
			window.localStorage.removeItem(key);
		} catch (err) {
			console.log(err);
		}
	};

	return { setItem, getItem, removeItem };
};
