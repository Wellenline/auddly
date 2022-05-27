import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from "@angular/core";
import { SlideRight } from "../../animations/slide";

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrls: ["./sidebar.component.scss"],
	animations: [SlideRight]
})
export class SidebarComponent implements OnInit {
	@ViewChild(TemplateRef) templateRef: TemplateRef<any>;
	@Output() closed = new EventEmitter<void>();

	constructor() { }

	ngOnInit(): void {
	}

	public open() {

	}

	public close() {
		this.closed.emit();
	}
}
