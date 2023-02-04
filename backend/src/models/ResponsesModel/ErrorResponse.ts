export class ErrorResponse {
	code: number;
	status: string;
	error: ErrorDetails;
	meta: {
		timestamp: string;
	};
	constructor(code: number, status: string, error: ErrorDetails) {
		this.code = code;
		this.status = status;
		this.error = error;
		this.meta = {
			timestamp: Date.now().toLocaleString(),
		};
	}

}

export class ErrorDetails extends Error {
	name: string;
	details: string;
	constructor(name:string, message: string, details: string) {
		super(message);
		this.name = name;
		this.details = details;
		Error.captureStackTrace(this, this.constructor);
	}
}
