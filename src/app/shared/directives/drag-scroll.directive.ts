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
		this.mouseDown = true;
		this.startX = e.clientX;
		this.scrollLeft = this.element.nativeElement.scrollLeft;
	}

	@HostListener("mouseleave", ["$event"])
	@HostListener("mouseup", ["$event"])
	public onStopDragging(e) {
		this.mouseDown = false;
	}

	@HostListener("mousemove", ["$event"])
	public onDragging(e) {
		e.preventDefault();
		if (!this.mouseDown) {
			return;
		}
		console.log(e);
		const x = e.pageX - this.element.nativeElement.offsetLeft;
		const scroll = x - this.startX;
		this.element.nativeElement.scrollLeft = this.scrollLeft - scroll;
	}




	/*(mousedown)="startDragging($event, false, elemt)" (mouseup)="stopDragging($event, false)"
	(mouseleave)="stopDragging($event, false)" (mousemove)="moveEvent($event, elemt)"
	  /*
	mouseDown = false;

	startX: any;

	scrollLeft: any;

	slider = document.querySelector<HTMLElement>('.parent');

	startDragging(e, flag, el) {
	  this.mouseDown = true;
	  this.startX = e.pageX - el.offsetLeft;
	  this.scrollLeft = el.scrollLeft;
	}
	stopDragging(e, flag) {
	  this.mouseDown = false;
	}
	moveEvent(e, el) {
	  e.preventDefault();
	  if (!this.mouseDown) {
		return;
	  }
	  console.log(e);
	  const x = e.pageX - el.offsetLeft;
	  const scroll = x - this.startX;
	  el.scrollLeft = this.scrollLeft - scroll;
	}
  */
}
