import {
	Directive,
	ElementRef,
	Input,
	OnDestroy,
	ViewContainerRef
} from '@angular/core';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { merge, Observable, Subscription } from 'rxjs';
import { DropdownComponent } from '../components/dropdown/dropdown.component';

@Directive({
	selector: '[dropdownTriggerFor]',
	host: {
		'(click)': 'toggleDropdown()'
	}
})
export class DropdownTriggerForDirective implements OnDestroy {
	private isDropdownOpen = false;
	private overlayRef: OverlayRef;
	private dropdownClosingActionsSub = Subscription.EMPTY;

	@Input('dropdownTriggerFor') public dropdownPanel: DropdownComponent;
	@Input('dropdownPosition') public position: any = {
		originX: 'end',
		originY: 'bottom',
		overlayX: 'end',
		overlayY: 'top',
		offsetY: 8,
		offsetX: 0,
	};

	constructor(
		private overlay: Overlay,
		private elementRef: ElementRef<HTMLElement>,
		private viewContainerRef: ViewContainerRef
	) { }

	toggleDropdown(): void {
		this.isDropdownOpen ? this.destroyDropdown() : this.openDropdown();
	}

	openDropdown(): void {
		this.isDropdownOpen = true;
		this.overlayRef = this.overlay.create({
			hasBackdrop: true,
			backdropClass: 'cdk-overlay-transparent-backdrop',
			scrollStrategy: this.overlay.scrollStrategies.close(),
			positionStrategy: this.overlay
				.position()
				.flexibleConnectedTo(this.elementRef)
				.withPositions([this.position])
		});

		const templatePortal = new TemplatePortal(
			this.dropdownPanel.templateRef,
			this.viewContainerRef
		);
		this.overlayRef.attach(templatePortal);

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
