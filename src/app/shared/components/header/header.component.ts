import { Location } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from "@angular/core";

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

	@Input() title: string;
	@Input() iosFix: boolean = true;

	@Input() actions: any[] = [];
	@Input() public actionTemplate: ElementRef | any;
	@Input() public backTemplate: ElementRef | any;
	@Input() backPreventDefault = false;
	@Output() onClose = new EventEmitter();

	constructor(private location: Location) { }

	ngOnInit(): void {
	}


	public pop() {
		if (this.backPreventDefault) {
			return this.onClose.emit();
		}
		this.location.back();
	}

}
