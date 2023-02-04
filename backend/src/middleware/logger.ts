// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const info = (...params : any) => {
	if (process.env.NODE_ENV !== "production") {
		console.log(...params);
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const error = (...params: any) => {
	if (process.env.NODE_ENV !== "production") {
		console.error(...params);
	}
};
