import { Component, OnInit, Input } from "@angular/core";
import { ITrack, PlayerService } from "src/app/services/player.service";

@Component({
	selector: "app-track-list",
	templateUrl: "./track-list.component.html",
	styleUrls: ["./track-list.component.scss"],
})
export class TrackListComponent implements OnInit {
	@Input() public track: ITrack = {};
	constructor(public playerService: PlayerService) { }

	public ngOnInit(): void {
	}

}
