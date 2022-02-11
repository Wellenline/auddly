import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
	selector: "[appRipple]"
})
export class RippleDirective {
	private hostEl: any;
	private _timeout: any;
	constructor(private renderer: Renderer2, el: ElementRef) {
		this.hostEl = el.nativeElement;
		this.hostEl.classList.add("transformer");

	}

	@HostListener("click", ["$event"]) onClick(event: MouseEvent) {
		const button = event.currentTarget as HTMLElement;
		const rect = button.getBoundingClientRect();
		const circle = document.createElement("span");
		const diameter = Math.max(rect.width, rect.height);

		const radius = diameter / 2;
		const x = event.clientX - rect.left - radius;
		const y = event.clientY - rect.top - radius;
		let borderRadius: string;
		if (window.getComputedStyle) {
			borderRadius = getComputedStyle(this.hostEl).getPropertyValue("border-radius");
		}
		circle.style.width = circle.style.height = `${diameter}px`;
		circle.style.left = `${x}px`;

		if (borderRadius) {
			circle.style.borderRadius = borderRadius;
		}
		circle.style.top = `${y}px`;
		circle.classList.add("ripple");
		const ripple = button.getElementsByClassName("ripple")[0];

		if (ripple) {
			ripple.remove();
		}

		const og = {
			overflow: this.hostEl.style.overflow,
			position: this.hostEl.style.position,
		}
		this.hostEl.style.overflow = "hidden";
		this.hostEl.style.position = "relative";

		if (this._timeout) {
			clearTimeout(this._timeout);
		}
		this._timeout = setTimeout(() => {
			this.hostEl.style.overflow = og.overflow;
			this.hostEl.style.position = og.position;
			circle.remove();
		}, 500);



		button.appendChild(circle);
	}


}
