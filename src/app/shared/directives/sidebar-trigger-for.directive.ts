import {
	Directive,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
	ViewContainerRef
} from "@angular/core";

import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { merge, Observable, Subscription } from "rxjs";
import { DropdownComponent } from "../components/dropdown/dropdown.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";

@Directive({
	selector: "[sidebarTriggerFor]",
	host: {
		"(click)": "toggleSide()"
	}
})
export class SidebarTriggerForDirective implements OnDestroy {
	private isDropdownOpen = false;
	private overlayRef: OverlayRef;
	private dropdownClosingActionsSub = Subscription.EMPTY;

	@Input("sidebarTriggerFor") public dropdownPanel: SidebarComponent;
	@Input("sidebarPosition") public position: "left" | "right" = "right";
	@Output("sidebarClosed") sidebarClosed = new EventEmitter<void>();
	constructor(
		private overlay: Overlay,
		private elementRef: ElementRef<HTMLElement>,
		private viewContainerRef: ViewContainerRef
	) { }

	toggleSide(): void {
		this.isDropdownOpen ? this.destroyDropdown() : this.openDropdown();

	}

	openDropdown(): void {
		const center = this.overlay.position()
			.global().centerVertically().centerHorizontally();
		const left = this.overlay.position().global().left("0");
		const right = this.overlay.position().global().right("0");
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
			// scrollStrategy: this.overlay.scrollStrategies.close(),
			positionStrategy
			/*positionStrategy: this.overlay
				.position()
				.flexibleConnectedTo(this.elementRef)
				.withPositions([this.position])*/
		});

		const templatePortal = new TemplatePortal(
			this.dropdownPanel.templateRef,
			this.viewContainerRef
		);
		this.overlayRef.attach(templatePortal);

		const destroy = (data?: any) => {
			this.overlayRef.detach();
			this.overlayRef.dispose();
			this.sidebarClosed.emit();
			/*if (config.callback) {
				config.callback(data);
			}*/
		};


		/*	this.overlayRef.backdropClick().subscribe(() => {
				destroy();
			});

			this.overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
				if (event.key === "Escape") {
					destroy();
				}
			});*/

		this.dropdownClosingActionsSub = this.dropdownClosingActions().subscribe(
			() => this.destroyDropdown()
		);
	}

	private dropdownClosingActions(): Observable<MouseEvent | void> {
		const backdropClick$ = this.overlayRef.backdropClick();
		const detachment$ = this.overlayRef.detachments();
		const dropdownClosed = this.dropdownPanel.closed;

		return merge(backdropClick$, detachment$, dropdownClosed);
	}

	private destroyDropdown(): void {
		if (!this.overlayRef || !this.isDropdownOpen) {
			return;
		}

		this.dropdownClosingActionsSub.unsubscribe();
		this.isDropdownOpen = false;
		this.overlayRef.detach();
	}

	ngOnDestroy(): void {
		if (this.overlayRef) {
			this.overlayRef.dispose();
		}
	}
}
