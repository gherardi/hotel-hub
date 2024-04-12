import dotenv from 'dotenv';
dotenv.config();

export default function (err, req, res, next) {
	err.code = err.code || 500;
	err.status = err.status || 'error';

	res.status(err.code).json({
		status: err.status,
		error: err,
		message: err.message,
		// stack: err.stack,
	});
}
