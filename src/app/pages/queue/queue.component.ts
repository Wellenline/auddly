import { Component, OnInit } from "@angular/core";
import { ITrack, PlayerService } from "src/app/services/player.service";
import { Location } from '@angular/common';

@Component({
	selector: "app-queue",
	templateUrl: "./queue.component.html",
	styleUrls: ["./queue.component.scss"],
})
export class QueueComponent implements OnInit {
	public tracks = [];
	public track: ITrack = {};
	constructor(private playerService: PlayerService, private location: Location) { }

	ngOnInit(): void {
		this.playerService.$queue.subscribe((tracks) => {
			this.tracks = tracks;
		});

		this.playerService.$track.subscribe((track) => {
			this.track = track;
		});
	}

	public onClear() {
		this.playerService.$queue.next([]);
	}

	public onClose() {
		this.location.back();
	}

}
