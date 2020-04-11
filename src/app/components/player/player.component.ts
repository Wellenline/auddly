import { Component, OnInit } from "@angular/core";
import { PlayerService, ITrack } from "src/app/services/player.service";

@Component({
	selector: "app-player",
	templateUrl: "./player.component.html",
	styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements OnInit {
	public progress = 0;
	public playing = false;
	public currentTime = 0;
	public track: ITrack;
	constructor(public playerService: PlayerService) { }

	public ngOnInit(): void {

		this.playerService.$playing.subscribe((playing) => {
			this.playing = playing;
		});

		this.playerService.$progress.subscribe((num) => {
			this.progress = num;
			this.currentTime = this.playerService.audio.currentTime;
		});

		this.playerService.$track.subscribe((track) => {
			this.track = track;
		});
	}

	public onProgress(e) {
		this.playerService.onSeek((e.pageX - e.srcElement.offsetLeft) / e.currentTarget.clientWidth);
	}
}
