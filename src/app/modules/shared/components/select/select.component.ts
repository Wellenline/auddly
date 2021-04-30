import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, SimpleChanges, TemplateRef, ContentChild } from "@angular/core";
import { NgForOfContext } from '@angular/common';
export function debounce(delay: number = 300): MethodDecorator {
	return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
		let timeout = null;

		const original = descriptor.value;

		descriptor.value = function (...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => original.apply(this, args), delay);
		};

		return descriptor;
	};
}
@Component({
	selector: "app-select",
	templateUrl: "./select.component.html",
	styleUrls: ["./select.component.scss"],
})
export class SelectComponent implements OnInit {
	@Input() public disabled: boolean = false;
	@Input() public color: string = "#f5650f";
	@Input() public required: boolean = false;

	@Input() public placeholder: string;
	@Input() public config: { search?: boolean, clear?: boolean, lazyload?: boolean, key?: string, value?: string, multiple?: boolean } = { search: true, multiple: false, lazyload: true };

	@Input() public items: any[] = [];
	@ContentChild(TemplateRef) public template: TemplateRef<NgForOfContext<any>>;

	@Input() public selected: any;
	@Output() public selectedChange = new EventEmitter();

	@Output() public onSearching = new EventEmitter();

	public isOpen = false;
	public search: string;
	@ViewChild("searchField", { static: true }) public searchField: ElementRef;

	public _selectedItems: any;
	public _mappedItems = [];
	public _itemsCache = [];

	constructor(private elementRef: ElementRef) { }

	public ngOnInit() {

		document.documentElement.style.setProperty("--border-color", this.color);



		this.config = Object.assign({ multiple: false, lazyload: true, clear: true, search: true, }, this.config)
	}

	public ngOnChanges(changes: SimpleChanges) {
		if (changes.items && changes.items.firstChange !== changes.items.currentValue) {
			this._flattenItems(changes.items.currentValue);
		}

		if (changes.selected && changes.selected.currentValue !== changes.selected.previousValue) {
			this.detechSelectedChange();
		}
	}

	public detechSelectedChange() {
		if (this.config.multiple) {
			// map items to plain array
			if (!this.selected) {
				this.selected = [];
			}
			this._selectedItems = this.items.filter((item) => (this.selected as string[])
				.includes(this.config.key && this.config.value ? item[this.config.value] : item)).map((item) => this.config.key ? item[this.config.key] : item);
		} else {
			const itemFound = this.items.find((item) => this.config.key
				&& this.config.value ? item[this.config.value] === this.selected : item === this.selected);

			this._selectedItems = itemFound && itemFound[this.config.key] ? itemFound[this.config.key] : itemFound;
		}

		if (this._selectedItems === undefined) {
			this._selectedItems = this.config.multiple ? [] : "";
		}

	}
	/**
	 * Flatten items if nessecary
	 * @param items any[]
	 */
	public _flattenItems(items: any[]) {

		// Update cache
		this._mappedItems = items.map((item) => typeof item === "string" || typeof item === "number" || this.template ? item : item[this.config.key]);
		this._itemsCache = items.map((item) => typeof item === "string" || typeof item === "number" || this.template ? item : item[this.config.key]);

		this.detechSelectedChange();
		// console.log("FlattenItems()", this._mappedItems);

		/*if (this.config.multiple) {
			// map items to plain array
			if (!this.selected) {
				this.selected = [];
			}
			this._selectedItems = items.filter((item) => (this.selected as string[])
				.includes(this.config.key && this.config.value ? item[this.config.value] : item)).map((item) => this.config.key ? item[this.config.key] : item);
		} else {
			const itemFound = items.find((item) => this.config.key
				&& this.config.value ? item[this.config.value] === this.selected : item === this.selected);

			this._selectedItems = itemFound && itemFound[this.config.key] ? itemFound[this.config.key] : itemFound;
		}

		if (this._selectedItems === undefined) {
			this._selectedItems = this.config.multiple ? [] : "";
		}*/
	}

	public isVisible(item) {

	}

	public _emitValue() {
		// map back together

		if (this.config.key && this.config.value) {
			if (this.config.multiple) {
				const items = this.items.filter((item) => this._selectedItems.includes(item[this.config.key]));

				this._mappedItems = this._itemsCache;
				// return this.selectedChange.emit(items.map((item) => item[this.config.value]));

				return this.selectedChange.emit(items.length > 0 ? items.map((item) => item[this.config.value]) : []);


			}

			const foundItem = this.items.find((item) => this._selectedItems === item[this.config.key]);

			this.onSearching.emit("");
			this.search = "";
			this._mappedItems = this._itemsCache;
			return this.selectedChange.emit(foundItem ? foundItem[this.config.value] : "");

		}

		if (this.config.key && !this.config.value) {
			const foundItem = this.items.find((item) => this._selectedItems === item[this.config.key]);

			this.onSearching.emit("");
			this.search = "";
			this._mappedItems = this._itemsCache;
			return this.selectedChange.emit(foundItem ? foundItem : {});

		}

		this.selectedChange.emit(this._selectedItems);
	}

	public onSelect(item) {
		// console.log("selectedItem", item);

		if (this.config.multiple) {

			if (!this._selectedItems) {
				this._selectedItems = [];
			}

			this._selectedItems.push(item);
		} else {
			this._selectedItems = item;
			this.onToggle();

		}
		this._emitValue();

		// this.locations = [];

	}

	public onRemoveItem(index) {
		this._selectedItems.splice(index, 1);
		if (this.config.multiple) {
			this._mappedItems = this._itemsCache.filter((i) => !this._selectedItems.includes(i));
		}

		this._emitValue();
	}

	public onClear() {
		if (this.config.multiple) {
			this._selectedItems = [];

		} else {
			this._selectedItems = "";
		}

		this._emitValue();
	}


	public onToggle() {
		if (this.disabled) {
			return;
		}
		this.isOpen = !this.isOpen;

		if (this.isOpen && this.config.search) {
			setTimeout(() => {
				document.getElementById("searchField").focus();


			}, 0);
		}
	}

	@HostListener("document:mousedown", ["$event"])
	public onGlobalClick(event): void {
		if (!this.elementRef.nativeElement.contains(event.target)) {
			// clicked outside => close dropdown list
			this.isOpen = false;
		}
	}

	// @debounce(300)
	public onSearch(query: string) {
		if (this.config.lazyload) {


			if (query.length > 1) {
				this._mappedItems = this._itemsCache.filter((i) => i.toLowerCase().includes(query.toLowerCase()));
			} else {
				this._mappedItems = this._itemsCache;
			}
		}
		this.onSearching.emit(query);
	}

}
