import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-shiner",
	templateUrl: "./shiner.component.html",
	styleUrls: ["./shiner.component.scss"]
})
export class ShinerComponent implements OnInit {
	@Input() public height: string;
	@Input() public width: string;
	@Input() public margin: string;
	@Input() public borderRadius: string;

	constructor() { }

	ngOnInit(): void {
	}

}
