import { Injectable } from "@angular/core";
interface IOptions {
	title?: string;
	message?: string;
	type?: "confirm" | "alert" | "prompt";
	value?: string;
	cancelButtonText?: string;
	okButtonText?: string;
	closed?: (status: any) => void;
}
@Injectable({
	providedIn: "root",
})
export class DialogService {
	public visible = false;
	public options: IOptions = { cancelButtonText: "Cancel", okButtonText: "Ok", type: "alert" };
	constructor() { }

	public show(options: IOptions) {
		this.visible = true;
		this.options = Object.assign(this.options, options);
	}

	public close(status) {
		this.visible = false;

		if (this.options.closed) {
			this.options.closed(status);
		}
	}
}
