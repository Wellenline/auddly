import { Injectable } from "@angular/core";
interface IOptions {
	timeout?: number;
}

@Injectable({
	providedIn: "root",
})
export class ToastService {

	public queue = [];

	constructor() { }

	public show(message: string, options: IOptions = { timeout: 3000 }) {
		this.queue.push(message);
		setTimeout(() => this.dismiss(), options.timeout);
	}

	public dismiss(index?: number) {
		this.queue.splice(index || 0, 1);
	}
}
