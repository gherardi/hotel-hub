export default class ApplicationError extends Error {
	code: number;
	status: 'fail' | 'error';
  
	constructor(message: string, code = 500) {
		super(message);
		this.code = code;
		this.status = `${code}`.startsWith('4') ? 'fail' : 'error';
	}
}
