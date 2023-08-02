import { Location } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
	@Input() back: boolean;
	@Input() transparent: boolean = false;
	@Input() sticky: boolean = true;

	@Input() collapse: boolean = false;
	@Input() backPreventDefault = false;
	@Output() onClose = new EventEmitter();
	constructor(private location: Location,) { }

	ngOnInit(): void {
	}


	public pop() {
		if (this.backPreventDefault) {
			return this.onClose.emit();
		}
		this.location.back();
	}

}
