import { Request, Response, NextFunction } from 'express';

export default (
		asyncFunction: (req: Request, res: Response, next: NextFunction) => {}
	) =>
	(req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(asyncFunction(req, res, next)).catch(next);
	};
