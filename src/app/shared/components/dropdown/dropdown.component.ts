import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from "@angular/core";

@Component({
	selector: "app-dropdown",
	templateUrl: "./dropdown.component.html",
	styleUrls: ["./dropdown.component.scss"]
})
export class DropdownComponent implements OnInit {
	@ViewChild(TemplateRef) templateRef: TemplateRef<any>;
	@Output() closed = new EventEmitter<void>();

	constructor() { }

	ngOnInit(): void {
	}

}
