import { OverlayRef, Overlay, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, Injector, Input, ViewContainerRef } from '@angular/core';
import { TOOLTIP_DATA, TooltipComponent, TooltipData } from './tooltip.component';

@Directive({
	selector: '[appTooltip]',

	standalone: true
})
export class TooltipDirective {
	@Input() appTooltip!: TooltipData;

	private overlayRef: OverlayRef | null = null;

	constructor(
		private element: ElementRef<HTMLElement>,
		private overlay: Overlay,
		private viewContainer: ViewContainerRef,
	) { }

	@HostListener('mouseenter')
	@HostListener('focus')
	showTooltip(): void {
		if (this.overlayRef?.hasAttached() === true) {
			return;
		}

		this.attachTooltip();
	}

	@HostListener('mouseleave')
	@HostListener('blur')
	hideTooltip(): void {
		if (this.overlayRef?.hasAttached() === true) {
			this.overlayRef?.detach();
		}
	}

	ngOnDestroy(): void {
		this.overlayRef?.dispose();
	}

	private attachTooltip(): void {
		if (this.overlayRef === null) {
			const positionStrategy = this.getPositionStrategy();
			this.overlayRef = this.overlay.create({ positionStrategy });
		}

		const injector = Injector.create({
			providers: [
				{
					provide: TOOLTIP_DATA,
					useValue: this.appTooltip,
				},
			],
		});
		const component = new ComponentPortal(TooltipComponent, this.viewContainer, injector);
		this.overlayRef.attach(component);
	}

	private getPositionStrategy(): PositionStrategy {
		return this.overlay
			.position()
			.flexibleConnectedTo(this.element)
			.withPositions([
				{
					originX: 'center',
					originY: 'top',
					overlayX: 'center',
					overlayY: 'bottom',
					panelClass: 'top',
				},
				{
					originX: 'center',
					originY: 'bottom',
					overlayX: 'center',
					overlayY: 'top',
					panelClass: 'bottom',
				},
			]);
	}

}
