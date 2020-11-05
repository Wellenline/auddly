import { Component, OnInit } from "@angular/core";
import { ITrack, PlayerService } from "src/app/services/player.service";

@Component({
	selector: "app-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
	public track: ITrack = {};
	constructor(private playerService: PlayerService) { }

	public ngOnInit(): void {

		this.playerService.$track.subscribe((track) => {
			this.track = track;
		});
	}

}
