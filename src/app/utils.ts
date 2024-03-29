export function debounce(delay: number = 300): MethodDecorator {
	return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
		let timeout = null;

		const original = descriptor.value;

		descriptor.value = function (...args: any) {
			clearTimeout(timeout);
			timeout = setTimeout(() => original.apply(this, args), delay);
		};

		return descriptor;
	};
}
export const getBoolean = (key: any, def?: boolean): boolean => {
	const value = localStorage.getItem(`BOOL_${key}`);
	return value !== null ? JSON.parse(value) : def;
};

export const setBoolean = (key: any, value: boolean) => {
	localStorage.setItem(`BOOL_${key}`, JSON.stringify(value));
};
