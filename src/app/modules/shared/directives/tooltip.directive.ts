import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { InterfaceService } from "../services/interface.service";

@Directive({
	selector: "[appTooltip]",
})
export class TooltipDirective {
	@Input() tooltip: any;

	constructor(
		private element: ElementRef,
		private service: InterfaceService
	) { }

	@HostListener("mouseenter")
	onEnter() {
		const dimensions = this.element.nativeElement.getBoundingClientRect();
		let content = this.tooltip;
		if (!Array.isArray(content)) {
			content = [this.tooltip];
		}
		const tooltip = {
			content,
			dimensions
		};
		this.service.tooltip$.next(tooltip);
	}

	@HostListener("mouseleave")
	onLeave() {
		this.service.tooltip$.next(false);
	}

}
