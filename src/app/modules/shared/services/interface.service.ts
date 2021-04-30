import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
interface IOptions {
	timeout?: number;
	title?: string;
}
interface IDialogOptions {
	title?: string;
	message?: string;
	type?: "confirm" | "alert" | "prompt";
	cancelButtonText?: string;
	okButtonText?: string;
	closed?: (status) => void;
}
@Injectable({
	providedIn: "root"
})
export class InterfaceService {
	public queue = [];
	public tooltip$: BehaviorSubject<{
		content: any,
		dimensions: any
	} | boolean> = new BehaviorSubject(false);

	public dialog: {
		visible: boolean,
		options: IDialogOptions,
		show: (options: IDialogOptions) => void,
		close: (status: boolean | string) => void,
	} = {
			visible: false,
			options: { cancelButtonText: "Cancel", okButtonText: "Ok", type: "alert" },
			show: (options: IDialogOptions) => {
				this.dialog.visible = true;
				this.dialog.options = Object.assign(this.dialog.options, options);
			},
			close: (status) => {
				this.dialog.visible = false;

				if (this.dialog.options.closed) {
					this.dialog.options.closed(status);
				}
			}
		}
	constructor() { }

	public notify(message: string, options: IOptions = { timeout: 3000 }) {
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
