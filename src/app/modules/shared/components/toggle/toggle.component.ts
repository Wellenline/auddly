import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-toggle",
	templateUrl: "./toggle.component.html",
	styleUrls: ["./toggle.component.scss"]
})
export class ToggleComponent implements OnInit {
	@Input() public selected: boolean;
	@Input() public label: string;
	constructor() { }

	ngOnInit(): void {
	}

}
