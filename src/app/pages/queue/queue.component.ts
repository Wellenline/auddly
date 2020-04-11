import { Component, OnInit } from "@angular/core";
import { PlayerService } from "src/app/services/player.service";

@Component({
	selector: "app-queue",
	templateUrl: "./queue.component.html",
	styleUrls: ["./queue.component.scss"],
})
export class QueueComponent implements OnInit {
	public tracks = [];
	constructor(private playerService: PlayerService) { }

	ngOnInit(): void {
		this.playerService.$queue.subscribe((tracks) => {
			this.tracks = tracks;
		});
	}

}
