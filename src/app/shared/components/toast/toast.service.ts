import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector } from '@angular/core';
import { IToastConfig } from './toast-config';
import { ToastComponent } from './toast.component';

@Injectable({
	providedIn: 'root'
})
export class ToastService {
	constructor(private overlay: Overlay) { }

	show(data: IToastConfig) {
		/*const config = new OverlayConfig();
		const positionStrategy = this.overlay.position()
			.global().centerVertically().centerHorizontally();
		config.positionStrategy = positionStrategy;*/
		let overlayRef = this.overlay.create({
			//hasBackdrop: true,
			//backdropClass: "cdk-overlay-backdrop",
			//scrollStrategy: this.overlay.scrollStrategies.close(),
			positionStrategy: this.overlay.position().global()
				.centerHorizontally().bottom(),
		});
		console.log("HERE")
		const inject = Injector.create({
			providers: [
				{
					provide: ToastRef,
					useValue: overlayRef
				},
				{
					provide: ToastConfig,
					useValue: data
				}
			]
		})
		console.log(inject.get<string>(ToastRef))
		let partal = new ComponentPortal(ToastComponent, null, inject);
		overlayRef.attach(partal)
		/*setTimeout(() => {
			overlayRef.detach()
			overlayRef.dispose();
		}, 2000);*/
	}
}

export const ToastRef = new InjectionToken<{}>('ToastRef');
export const ToastConfig = new InjectionToken<{}>('ToastConfig');
