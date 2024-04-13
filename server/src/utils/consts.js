export const strongPasswordOptions = {
	minUppercase: 0,
	minNumbers: 0,
	minLength: 8,
	minSymbols: 1,
};

export const rateLimitOptions = {
	windowMs: 60 * 60 * 1000,
	limit: 100,
	message: 'Too many requests from this IP, please try again in an hour!',
};
