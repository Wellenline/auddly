import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "app-artist-list",
	templateUrl: "./artist-list.component.html",
	styleUrls: ["./artist-list.component.scss"],
})
export class ArtistListComponent implements OnInit {
	@Input() public artist: any = {};
	@Input() public size: string = "";
	constructor() { }

	ngOnInit(): void {
	}

}
