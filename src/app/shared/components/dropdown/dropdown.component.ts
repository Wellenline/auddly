import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from "@angular/core";

@Component({
	selector: "app-dropdown",
	templateUrl: "./dropdown.component.html",
	styleUrls: ["./dropdown.component.scss"]
})
export class DropdownComponent implements OnInit {
	@ViewChild(TemplateRef) templateRef: TemplateRef<any>;
	@Output() closed = new EventEmitter<void>();
	@Input() closeOnClick = true;
	@Input() ignoreStyle = false;
	@Input() width = 224;

	constructor() { }

	ngOnInit(): void {
	}

	public onClick() {
		if (this.closeOnClick) {
			this.closed.emit();
		}
	}

}
