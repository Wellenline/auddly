import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from "@angular/core";

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

	constructor(private host: ElementRef) { }

	public ngOnInit() {
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

	public ngOnDestroy() {
		this.observer.disconnect();
	}

	private isHostScrollable() {
		const style = window.getComputedStyle(this.element);

		return style.getPropertyValue("overflow") === "auto" ||
			style.getPropertyValue("overflow-y") === "scroll";
	}

}
