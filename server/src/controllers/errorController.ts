import { Request, Response, NextFunction } from 'express';
import ApplicationError from '../utils/applicationError';

export default function (
	err: ApplicationError,
	req: Request,
	res: Response,
	next: NextFunction
) {
	err.code = err.code || 500;
	err.status = err.status || 'error';

	res.status(err.code).json({
		status: err.status,
		error: err,
		message: err.message,
		// stack: err.stack,
	});
}
