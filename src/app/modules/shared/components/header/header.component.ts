import { Location } from "@angular/common";
import { Component, ElementRef, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
	@Input() back: boolean;
	@Input() transparent: boolean;
	@Input() static: boolean = false;

	@Input() title: string;
	@Input() actions: any[] = [];
	@Input() public actionTemplate: ElementRef;
	constructor(private location: Location) { }

	ngOnInit(): void {
	}


	public pop() {
		this.location.back();
	}

}
