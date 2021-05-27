import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";

@Component({
	selector: "app-button",
	templateUrl: "./button.component.html",
	styleUrls: ["./button.component.scss"]
})
export class ButtonComponent implements OnInit {
	@Input() class: string;

	@Input() loading: boolean;
	@Input() disabled: boolean;
	@Input() invert: boolean;
	@Input() block: boolean;
	@Input() textColor: string;
	@Input() background: string;

	@ViewChild("button") button: ElementRef;
	constructor() { }

	ngOnInit(): void {

	}
	ngAfterViewInit() {
		if (this.background) {
			this.button.nativeElement.style.backgroundColor = this.background;
		}

		if (this.textColor) {
			this.button.nativeElement.style.color = this.textColor;
		}
	}
}
