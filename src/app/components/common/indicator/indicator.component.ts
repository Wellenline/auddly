import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-indicator",
	templateUrl: "./indicator.component.html",
	styleUrls: ["./indicator.component.scss"],
})
export class IndicatorComponent implements OnInit {
	@Input() public loading = false;
	@Input() public message: string;
	constructor() { }

	ngOnInit(): void {
	}

}
