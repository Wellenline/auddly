import { Overlay, OverlayConfig } from "@angular/cdk/overlay";
import { ComponentPortal, ComponentType } from "@angular/cdk/portal";
import { Injectable, InjectionToken, Injector } from "@angular/core";
import { Observable, Subject, Subscriber } from "rxjs";
import { IModalConfig } from "./modal-config";
import { ModalComponent } from "./modal.component";

@Injectable({
	providedIn: "root"
})
export class ModalService {
	constructor(private overlay: Overlay) { }

	show(config: IModalConfig) {
		const center = this.overlay.position()
			.global().centerVertically().centerHorizontally();
		const left = this.overlay.position().global().left("0");
		const right = this.overlay.position().global().right("0");
		const bottom = this.overlay.position().global().centerHorizontally().bottom();

		let positionStrategy = center;

		if (config.position === "left") {
			positionStrategy = left;
		} else if (config.position === "right") {
			positionStrategy = right;
		}
		else if (config.position === "bottom") {
			positionStrategy = bottom;
		}

		console.log(config.class);
		const overlayRef = this.overlay.create({
			hasBackdrop: true,
			disposeOnNavigation: true,

			backdropClass: "modal-backdrop",
			panelClass: config.class || "modal-panel",
			positionStrategy, // config?.overlayConfig?.positionStrategy || positionStrategy,
			scrollStrategy: this.overlay.scrollStrategies.block(),
			// scrollStrategy: this.overlay.scrollStrategies.reposition()
			// scrollStrategy: this.overlay.scrollStrategies.close(),
			// positionStrategy: this.overlay.position().global()
			// .centerHorizontally().bottom(),
		});

		history.pushState(null, "modalOpened");



		const destroy = (data?: any) => {
			overlayRef.detach();
			overlayRef.dispose();
			if (config.callback) {
				config.callback(data);
			}
		};



		const inject = Injector.create({
			providers: [
				{
					provide: ModalRef,
					useValue: overlayRef
				},
				{
					provide: ModalConfig,
					useValue: config
				},
			]
		});
		const portal = new ComponentPortal(ModalComponent, null, inject);
		overlayRef.attach(portal);


		overlayRef.backdropClick().subscribe(() => {
			destroy();
		});

		overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
			if (event.key === "Escape") {
				destroy();
			}
		});
	}
}

export const ModalRef = new InjectionToken<{}>("ModalRef");
export const ModalConfig = new InjectionToken<{}>("ModalConfig");
