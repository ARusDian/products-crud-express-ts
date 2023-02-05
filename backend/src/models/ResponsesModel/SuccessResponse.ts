export class SuccessResponse<T> { 
	code: number;
	status: string;
	data: DataDetailResponse<T>;
	meta: {
        timestamp: string;
    };
	constructor(code: number, status: string, data: DataDetailResponse<T>) {
		this.code = code;
		this.status = status;
		this.data = data;
		this.meta = {
			timestamp: Date.now().toLocaleString(),
		};
	}
}

export class DataDetailResponse<T> {
	name: string;
	data: T | T[];
	constructor(name: string, data: T) {
		this.name = name;
		this.data = data;
	}
}
