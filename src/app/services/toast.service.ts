import { Injectable } from "@angular/core";
interface IOptions {
	timeout?: number;
}

@Injectable({
	providedIn: "root",
})
export class ToastService {
	public visible = false;
	public message: string;

	public options: IOptions = { timeout: 1000 };
	constructor() { }

	public show(message, options: IOptions) {
		this.message = message;
		this.visible = true;
		this.options = Object.assign(this.options, options);

		setTimeout(() => {
			this.visible = false;
			this.message = "";
		}, options.timeout);
	}

	public close(status) {
		this.visible = false;
		this.message = "";
	}
}
