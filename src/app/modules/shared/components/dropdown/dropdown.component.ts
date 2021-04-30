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

	public _selectedItems: any;
	public _mappedItems = [];
	public _itemsCache = [];

	constructor(private elementRef: ElementRef) { }

	public ngOnInit() {



		this.config = Object.assign({ multiple: false, lazyload: true, clear: true, search: true, }, this.config)

		if (this.header) {
			this.headerRef = this.header;
		}
	}

	public ngOnChanges(changes: SimpleChanges) {

	}

	public close() {
		this.open = false;
	}

	public show() {
		this.open = true;
	}

	public onToggle() {
		this.open = !this.open;
	}

	@HostListener("document:mousedown", ["$event"])
	public onGlobalClick(event): void {
		if (!this.elementRef.nativeElement.contains(event.target)) {
			// clicked outside => close dropdown list
			this.open = false;
		}
	}
}
