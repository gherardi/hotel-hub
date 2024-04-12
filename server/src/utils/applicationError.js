export default class ApplicationError extends Error {
	constructor(message, code = 500) {
		super(message);
		this.code = code;
		this.status = `${code}`.startsWith('4') ? 'fail' : 'error';
	}
}
