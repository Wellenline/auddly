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
		console.log("Toast pushed");
		this.queue.push(message);
		setTimeout(() => {
			this.dismiss();
		}, options.timeout);
	}

	public dismiss(index?: number) {
		this.queue.splice(index || 0, 1);
		// this.visible = false;
	}
}
