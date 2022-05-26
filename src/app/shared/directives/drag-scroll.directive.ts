import { Directive, ElementRef, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
	selector: "[appDragScroll]"
})
export class DragScrollDirective {
	@Output() public onScroll = new EventEmitter();

	public mouseDown = false;
	public startX: number;
	public scrollLeft: number;
	constructor(private element: ElementRef<HTMLElement>) { }

	@HostListener("mousedown", ["$event"])
	public onStartDragging(e) {
		e.preventDefault();
		e.stopPropagation();
		this.mouseDown = true;
		this.startX = e.clientX;
		this.scrollLeft = this.element.nativeElement.scrollLeft;
	}

	@HostListener("mouseleave", ["$event"])
	@HostListener("mouseup", ["$event"])
	public onStopDragging(e) {
		e.preventDefault();
		e.stopPropagation();
		this.mouseDown = false;
	}

	@HostListener("mousemove", ["$event"])
	public onDragging(e) {
		e.preventDefault();
		e.stopPropagation();
		if (!this.mouseDown) {
			return;
		}
		const x = e.pageX - this.element.nativeElement.offsetLeft;
		const scroll = x - this.startX;
		this.element.nativeElement.scrollLeft = this.scrollLeft - scroll;
	}

}
