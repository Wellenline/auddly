import { Location } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { fromEvent } from "rxjs";
import { throttleTime, map, pairwise, distinctUntilChanged, share, filter } from "rxjs/operators";
enum VisibilityState {
	Visible = "visible",
	Hidden = "hidden"
}

enum Direction {
	Up = "Up",
	Down = "Down"
}
@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
	@Input() back: boolean;
	@Input() transparent: boolean;
	@Input() absolute: boolean = false;
	@Input() sticky: boolean = false;

	@Input() static: boolean = false;
	@Input() filler: boolean = true;
	@Input() collapse: boolean = false;

	@Input() title: string;
	@Input() iosFix: boolean = true;

	@Input() actions: any[] = [];
	@Input() public actionTemplate: ElementRef | any;
	@Input() public backTemplate: ElementRef | any;
	@Input() backPreventDefault = false;
	@Output() onClose = new EventEmitter();
	public isVisible = true;
	constructor(private location: Location, private el: ElementRef) { }

	ngOnInit(): void {
	}


	public pop() {
		if (this.backPreventDefault) {
			return this.onClose.emit();
		}
		this.location.back();
	}

	ngAfterViewInit() {
		/*	console.log(this.el);
			const rootContainer = document.getElementsByClassName("app-content")[0];
			const scrollEvent = fromEvent(rootContainer, "scroll");
	
			fromEvent(rootContainer, "scroll")
				.pipe(
					// throttleTime(10),
					// Is elementId scrolled for more than 50 from top?
					map((e: Event) => (e.target as Element).scrollTop),
	
					// Dispatch change only if result from map above is different from previous result
					distinctUntilChanged(),
					share()).subscribe((d) => {
						console.log("HERE", d);
						((this.el.nativeElement as HTMLElement).getElementsByClassName("header")[0] as any).style.transform = `translateY(${d}px)`;
					});
	*/
	}

}
