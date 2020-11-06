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
	public progress = 0;
	public volume = 100;
	public playing = false;
	public currentTime = 0;
	constructor(public playerService: PlayerService, private location: Location) { }

	ngOnInit(): void {
		this.playerService.$playing.subscribe((playing) => {
			this.playing = playing;
		});
		this.playerService.$progress.subscribe((num) => {
			this.progress = num;
			this.currentTime = this.playerService.audio.currentTime;
		});

		this.playerService.$queue.subscribe((tracks) => {
			this.tracks = tracks;
		});

		this.playerService.$track.subscribe((track) => {
			this.track = track;
		});


	}

	public onProgress(e) {
		this.playerService.onSeek(e);
	}


	public onClear() {
		this.playerService.clear();
	}

	public onClose() {
		this.location.back();
	}

}
