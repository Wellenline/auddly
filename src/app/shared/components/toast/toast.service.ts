import { Overlay, OverlayConfig } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable, InjectionToken, Injector } from "@angular/core";
import { IToastConfig } from "./toast-config";
import { ToastComponent } from "./toast.component";

@Injectable({
	providedIn: "root"
})
export class ToastService {
	constructor(private overlay: Overlay) { }

	show(data: IToastConfig) {
		const overlayRef = this.overlay.create({
			positionStrategy: this.overlay.position().global()
				.centerHorizontally().bottom(),
		});
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
		});
		const portal = new ComponentPortal(ToastComponent, null, inject);
		overlayRef.attach(portal);
		/*setTimeout(() => {
			overlayRef.detach()
			overlayRef.dispose();
		}, 2000);*/
	}
}

export const ToastRef = new InjectionToken<{}>("ToastRef");
export const ToastConfig = new InjectionToken<{}>("ToastConfig");
