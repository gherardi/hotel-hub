import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000,
	limit: 100,
	message: 'Too many requests from this IP, please try again in an hour!',
});

export default limiter;
