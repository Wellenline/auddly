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

	LightenDarkenColor(col, amt) {
		var usePound = false;
		if (col[0] == "#") {
			col = col.slice(1);
			usePound = true;
		}

		var num = parseInt(col, 16);

		var r = (num >> 16) + amt;

		if (r > 255) r = 255;
		else if (r < 0) r = 0;

		var b = ((num >> 8) & 0x00FF) + amt;

		if (b > 255) b = 255;
		else if (b < 0) b = 0;

		var g = (num & 0x0000FF) + amt;

		if (g > 255) g = 255;
		else if (g < 0) g = 0;

		return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
	}
}
