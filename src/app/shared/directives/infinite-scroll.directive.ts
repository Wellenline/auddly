import { Directive, ElementRef, EventEmitter, Input, Output } from "@angular/core";


import { fromEvent, Observable } from "rxjs";
import { exhaustMap, filter, map, pairwise, startWith } from "rxjs/operators";

interface ScrollPosition {
	sH: number;
	sT: number;
	cH: number;
}

const DEFAULT_SCROLL_POSITION: ScrollPosition = {
	sH: 0,
	sT: 0,
	cH: 0
};

@Directive({
	selector: "[appInfiniteScroll]"
})
export class InfiniteScrollDirective {


	private scrollEvent$: Observable<unknown>;

	private userScrolledDown$: Observable<[ScrollPosition, ScrollPosition]>;

	private requestStream$;

	private requestOnScroll$: Observable<[ScrollPosition, ScrollPosition]>;

	@Input()
	scrollCallback;

	@Input()
	immediateCallback;

	@Input()
	scrollPercent = 70;

	@Output() onScroll = new EventEmitter();

	constructor(private elm: ElementRef) { }

	ngAfterViewInit() {

		this.registerScrollEvent();

		this.streamScrollEvents();

		this.requestCallbackOnScroll();

	}

	private registerScrollEvent() {

		this.scrollEvent$ = fromEvent(this.elm.nativeElement, "scroll");

		this.scrollEvent$.subscribe((s) => {
			console.log("Scrolling down", s);
		});

	}

	private streamScrollEvents() {
		this.userScrolledDown$ = this.scrollEvent$.pipe(
			map((e: any): ScrollPosition => ({
				sH: e.target.scrollHeight,
				sT: e.target.scrollTop,
				cH: e.target.clientHeight
			})),
			pairwise(),
			filter(positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1])));
	}

	private requestCallbackOnScroll() {

		this.requestOnScroll$ = this.userScrolledDown$;

		if (this.immediateCallback) {
			this.requestOnScroll$ = this.requestOnScroll$.pipe(
				startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION])
			);
		}

		this.requestOnScroll$.pipe(
			exhaustMap(() => { return this.scrollCallback(); })
		).subscribe(() => { });

	}

	private isUserScrollingDown = (positions) => {
		return positions[0].sT < positions[1].sT;
	}

	private isScrollExpectedPercent = (position) => {
		return ((position.sT + position.cH) / position.sH) > (this.scrollPercent / 100);
	}

}

