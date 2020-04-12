import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "app-playlist-list",
	templateUrl: "./playlist-list.component.html",
	styleUrls: ["./playlist-list.component.scss"],
})
export class PlaylistListComponent implements OnInit {
	@Input() public playlist: any = {};

	constructor() { }

	ngOnInit(): void {
	}

}
