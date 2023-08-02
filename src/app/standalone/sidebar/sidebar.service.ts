import { Overlay, OverlayConfig } from "@angular/cdk/overlay";
import { ComponentPortal, ComponentType } from "@angular/cdk/portal";
import { Injectable, InjectionToken, Injector } from "@angular/core";
import { Observable, Subject, Subscriber } from "rxjs";
import { IModalConfig } from "../modal/modal-config";
import { SidebarComponent } from "./sidebar.component";

@Injectable({
	providedIn: "root",
})
export class SidebarService {
	constructor(private overlay: Overlay) { }

	show(config: IModalConfig) {
		const center = this.overlay.position()
			.global().centerVertically().centerHorizontally();
		const left = this.overlay.position().global().left("0");
		const right = this.overlay.position().global().right("0");
		const bottom = this.overlay.position().global().centerHorizontally()
			.bottom();

		/*
				const center = this.overlay.position()
					.global().centerVertically().centerHorizontally();
				const left = this.overlay.position().global().left('0');
				const right = this.overlay.position().global().right('0');
				const bottom = this.overlay.position().global().centerHorizontally().bottom();
				let positionStrategy = right;
	
				if (this.position === "left") {
					positionStrategy = left;
				} else if (this.position === "right") {
					positionStrategy = right;
				}
				else if (this.position === "bottom") {
					positionStrategy = bottom;
				}
	
				this.isDropdownOpen = true;
				this.overlayRef = this.overlay.create({
					hasBackdrop: true,
					// backdropClass: 'cdk-overlay-backdrop',
					scrollStrategy: this.overlay.scrollStrategies.close(),
					positionStrategy: positionStrategy
	
					});*/

		let positionStrategy = right;

		if (config.position === "left") {
			positionStrategy = left;
		} else if (config.position === "right") {
			positionStrategy = right;
		} else if (config.position === "bottom") {
			positionStrategy = bottom;
		}

		console.log(config.class);
		let overlayRef = this.overlay.create({
			hasBackdrop: true,
			disposeOnNavigation: true,

			// backdropClass: "modal-backdrop",
			//panelClass: config.class || "modal-panel",
			positionStrategy, // config?.overlayConfig?.positionStrategy || positionStrategy,
			scrollStrategy: this.overlay.scrollStrategies.block(),
			// scrollStrategy: this.overlay.scrollStrategies.reposition()
			//scrollStrategy: this.overlay.scrollStrategies.close(),
			// positionStrategy: this.overlay.position().global()
			//.centerHorizontally().bottom(),
		});

		history.pushState(null, "modalOpened-" + (new Date()).getTime());

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
					useValue: overlayRef,
				},
				{
					provide: ModalConfig,
					useValue: config,
				},
			],
		});
		let portal = new ComponentPortal(SidebarComponent, null, inject);
		overlayRef.attach(portal);

		overlayRef.backdropClick().subscribe(() => {
			// pdestroy();
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
