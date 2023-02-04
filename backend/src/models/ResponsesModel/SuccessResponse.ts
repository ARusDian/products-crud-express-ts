export class SuccessResponse<T> { 
	code: number;
	status: string;
	data: T;
	meta: {
        timestamp: string;
    };
	constructor(code: number, status: string, data: T) {
		this.code = code;
		this.status = status;
		this.data = data;
		this.meta = {
			timestamp: Date.now().toLocaleString(),
		};
	}
}
