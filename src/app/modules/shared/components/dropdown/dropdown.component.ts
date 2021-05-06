import { NgForOfContext } from "@angular/common";
import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from "@angular/core";

@Component({
	selector: "app-dropdown",
	templateUrl: "./dropdown.component.html",
	styleUrls: ["./dropdown.component.scss"]
})
export class DropdownComponent implements OnInit {
	@Input() public disabled: boolean = false;
	@Input() public color: string = "#f5650f";

	@Input() public placeholder: string;
	@Input() public config: {
		up?: boolean,
		right?: boolean,
		search?: boolean,
		clear?: boolean,
		lazyload?: boolean,
		key?: string, value?: string, multiple?: boolean
	} = { search: true, multiple: false, lazyload: true };

	@Input() public items: any[] = [];


	@Input() public header: any;

	@ContentChild(TemplateRef) public headerRef: TemplateRef<NgForOfContext<any>>;


	@Input() public selected: any;
	@Output() public selectedChange = new EventEmitter();

	@Output() public onSearching = new EventEmitter();

	public open = false;
	public search: string;
	@ViewChild("searchField", { static: true }) public searchField: ElementRef;
	@ViewChild("dropup") dropup: ElementRef;
	public _selectedItems: any;
	public _mappedItems = [];
	public _itemsCache = [];

	constructor(private elementRef: ElementRef) { }

	public ngOnInit() {



		this.config = Object.assign({ multiple: false, lazyload: true, clear: true, search: true, }, this.config);

		if (this.header) {
			this.headerRef = this.header;
		}
	}

	public ngOnChanges(changes: SimpleChanges) {

	}

	public outOfViewport() {
		// Get element's bounding
		const bounding = this.dropup.nativeElement.getBoundingClientRect();
		// Check if it's out of the viewport on each side
		const out: { top?: boolean, left?: boolean, bottom?: boolean, right?: boolean, any?: boolean, all?: boolean } = {};
		out.top = bounding.top < 0;
		out.left = bounding.left < 0;
		out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
		out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
		out.any = out.top || out.left || out.bottom || out.right;
		out.all = out.top && out.left && out.bottom && out.right;

		return out;
	}

	public close() {
		this.open = false;
	}

	public show() {
		this.open = true;
	}

	public onToggle() {
		this.open = !this.open;
		if (this.open) {
			const out = this.outOfViewport();
			if (out.top) {
				this.config.up = false;
			}

			if (out.bottom) {
				this.config.up = true;
			}
		}

	}

	@HostListener("document:mousedown", ["$event"])
	public onGlobalClick(event): void {
		if (!this.elementRef.nativeElement.contains(event.target)) {
			// clicked outside => close dropdown list
			this.open = false;
		}
	}
}
