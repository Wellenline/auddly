import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "app-album-list",
	templateUrl: "./album-list.component.html",
	styleUrls: ["./album-list.component.scss"],
})
export class AlbumListComponent implements OnInit {
	@Input() public album: any = {};
	constructor() { }

	ngOnInit(): void {
	}

}
