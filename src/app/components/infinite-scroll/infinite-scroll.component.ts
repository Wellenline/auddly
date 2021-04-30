import { isPlatformBrowser } from "@angular/common";
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, Inject, PLATFORM_ID } from "@angular/core";

@Component({
	selector: "infinite-scroll",
	template: `<ng-content></ng-content><div #anchor></div>`,
	styleUrls: ["./infinite-scroll.component.scss"],
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {

	get element() {
		return this.host.nativeElement;
	}
	@Input() public options = {};
	@Output() public scrolled = new EventEmitter();
	@ViewChild("anchor", { static: true }) public anchor: ElementRef<HTMLElement>;

	private observer: IntersectionObserver;

	constructor(@Inject(PLATFORM_ID) private platformId: Object, private host: ElementRef) { }

	public ngOnInit() {
		if (isPlatformBrowser(this.platformId)) {

			const options = {
				root: this.isHostScrollable() ? this.host.nativeElement : null,
				...this.options,
			};

			this.observer = new IntersectionObserver(([entry]) => {
				// console.log(entry);
				return entry.isIntersecting && this.scrolled.emit();
			}, options);
			this.observer.observe(this.anchor.nativeElement);
		}
	}

	public ngOnDestroy() {
		if (this.observer) {
			this.observer.disconnect();

		}
	}

	private isHostScrollable() {
		const style = window.getComputedStyle(this.element);

		if (style) {
			return style.getPropertyValue("overflow") === "auto" ||
				style.getPropertyValue("overflow-y") === "scroll";
		}



	}

}
