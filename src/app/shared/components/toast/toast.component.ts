import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Component, Inject, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../../animations/slide-in-out';
import { IToastConfig } from './toast-config';
import { ToastConfig, ToastRef } from './toast.service';

@Component({
	selector: 'app-toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
	animations: [slideInOutAnimation]
})
export class ToastComponent implements OnInit {
	// public toast: any = {};
	public visible = false;
	private _timeout: any;

	constructor(@Inject(ToastRef) public ref: OverlayRef, @Inject(ToastConfig) public toast: IToastConfig) { }

	ngOnInit(): void {
		this.visible = true;

		this._timeout = setTimeout(() => {
			this.onClose();
		}, this.toast.duration || 3000)
	}

	public onAction() {
		if (this.toast.actionCallback) {
			this.toast.actionCallback();
			this.onClose();
		}
	}

	public onClose() {
		if (this._timeout) {
			clearTimeout(this._timeout);
		}
		this.visible = false;

		setTimeout(() => {
			this.ref.detach();
			this.ref.dispose();
		}, 500);


	}

	ngOnDestroy() {
		// this.snackbarSubscription.unsubscribe();
	}
}
